"use strict";

const Config = use("Config");
const servers = Config.get("constants").servers;
const requests = use("App/Helpers/requests");
const storing = use("App/Helpers/storingHelpers");
const utils = use("App/Helpers/utils");
const roleIdentification = use("App/Helpers/roleIdentification");

function getNextServerNameToCrawl(lastCraweledServerName) {
  switch (lastCraweledServerName) {
    case servers.RU.name:
      return servers.BR.name;
    case servers.BR.name:
      return servers.EUNE.name;
    case servers.EUNE.name:
      return servers.EUW.name;
    case servers.EUW.name:
      return servers.JP.name;
    case servers.JP.name:
      return servers.KR.name;
    case servers.KR.name:
      return servers.LA1.name;
    case servers.LA1.name:
      return servers.LA2.name;
    case servers.LA2.name:
      return servers.NA.name;
    case servers.NA.name:
      return servers.OCE.name;
    case servers.OCE.name:
      return servers.TR.name;
    case servers.TR.name:
      return servers.RU.name;
    default:
      return servers.BR.name;
  }
}

async function crawlMatch(match, server, championRoles) {
  try {
    const matchId = match.gameId;
    try {
      await server.crawledGames().create({ gameId: matchId });
    } catch (e) {
      //Game is already crawled
      throw e;
    }
    const gameResponse = await requests.fetchMatchInfo(server.name, matchId);
    const { data } = gameResponse;
    await storing.storePlayersForCrawling(data, server);

    let team1Champions = [];
    let team2Champions = [];
    const team1Id = data.teams[0].teamId;
    data.participants.forEach((participant) => {
      if (participant.teamId === team1Id) {
        team1Champions.push(participant.championId);
      } else {
        team2Champions.push(participant.championId);
      }
    });
    const team1Roles = roleIdentification.getRoles(
      championRoles,
      team1Champions
    );
    const team2Roles = roleIdentification.getRoles(
      championRoles,
      team2Champions
    );

    const team1Win = data.teams[0].win === "Win";
    const matchupData = utils.assignMatchupData(
      team1Roles,
      team2Roles,
      team1Win
    );

    await storing.storeMatchup(matchupData);
  } catch (e) {
    // console.log(e)
    throw e;
  }
}

async function crawlPlayer(player, server, championRoles) {
  try {
    let gamesCollected = 0;
    const playerResponse = await requests.fetchPlayerInfo(
      server.name,
      player.summoner_name
    );
    const playerAccountId = playerResponse.data.accountId;
    const playerMatchlistResponse = await requests.fetchPlayerMatchlist(
      server.name,
      playerAccountId
    );
    //If player was active (played at least 1 ranked game in two weeks)
    if (playerMatchlistResponse.data.matches.length > 0) {
      await Promise.all(
        playerMatchlistResponse.data.matches.map(async (match) => {
          try {
            await crawlMatch(match, server, championRoles);
            gamesCollected++;
          } catch (e) {
            // throw e;
          }
        })
      );
    }
    return gamesCollected;
  } catch (e) {
    // console.log(e);
    throw e;
  } finally {
    player.crawled = true;
    await player.save();
  }
}

module.exports = {
  getNextServerNameToCrawl,
  crawlPlayer,
};
