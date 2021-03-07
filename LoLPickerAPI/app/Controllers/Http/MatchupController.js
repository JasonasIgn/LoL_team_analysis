"use strict";

const { match } = require("@adonisjs/framework/src/Route/Manager");

const Database = use("Database");
const Server = use("App/Models/Server");
const Player = use("App/Models/Player");
const CrawledGame = use("App/Models/CrawledGame");
const crawlHelpers = use("App/Helpers/crawlHelpers");
const pickHelpers = use("App/Helpers/pickHelpers");
const roleIdentification = use("App/Helpers/roleIdentification");
const storing = use("App/Helpers/storingHelpers");
const utils = use("App/Helpers/utils");
const requests = use("App/Helpers/requests");
const Config = use("App/Models/Config");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ratings
 */
class MatchupController {
  /**
   * Show a list of all ratings.
   * GET ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async collect({ request, response }) {
    try {
      let gamesCollected = 0;
      const championRoles = await roleIdentification.pullData();
      const config = await Config.first();
      const serverNameToCrawl = crawlHelpers.getNextServerNameToCrawl(
        config.last_craweled_server_name
      );
      config.last_craweled_server_name = serverNameToCrawl;
      await config.save();
      const server = await Server.findBy("name", serverNameToCrawl);
      const serverPlayerToCrawl = await server
        .players()
        .where("crawled", false)
        .first();
      if (!Boolean(serverPlayerToCrawl)) {
        response.status(400).send({ error: "All players have been crawled" });
        return;
      }
      serverPlayerToCrawl.crawled = true;
      await serverPlayerToCrawl.save();
      const playerResponse = await requests.fetchPlayerInfo(
        server.name,
        serverPlayerToCrawl.summoner_name
      );
      const playerAccountId = playerResponse.data.accountId;
      const playerMatchlistResponse = await requests.fetchPlayerMatchlist(
        server.name,
        playerAccountId
      );

      //If the player didn't play any ranked games (not active)
      if (playerMatchlistResponse.data.matches.length === 0) {
        response.status(200).send({ gamesCollected: 0 });
        return;
      }

      const promises = playerMatchlistResponse.data.matches.map(
        async (match) => {
          const matchId = match.gameId;
          try {
            await server.crawledGames().create({ gameId: matchId });
            gamesCollected++;
          } catch (e) {
            return;
          }
          const gameResponse = await requests.fetchMatchInfo(
            server.name,
            matchId
          );
          const { data } = gameResponse;
          let team1Champions = [];
          let team2Champions = [];

          const addPlayersToCrawlPromises = data.participantIdentities.map(async (identity) => {
            const playerSummonerName = identity.player.summonerName;
            try {
              await server
                .players()
                .create({ summoner_name: playerSummonerName });
            } catch (e) {
              console.log("ERROR: tried to add existing player:", playerSummonerName)
              return;
            }
          });

          await Promise.all(addPlayersToCrawlPromises);

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
        }
      );
      await Promise.all(promises);
      response.status(200).send({
        gamesCollected,
        serverCrawled: serverNameToCrawl,
        playerCrawled: serverPlayerToCrawl.summoner_name,
      });
    } catch (e) {
      console.log(e);
      response.status(400).send({});
    }
  }

  async whatDoIPlay({ request, response }) {
    const data = request.only([
      "top1",
      "jungle1",
      "middle1",
      "bottom1",
      "utility1",
      "top2",
      "jungle2",
      "middle2",
      "bottom2",
      "utility2",
    ]);

    const matchesTeam1 = await pickHelpers.fetchTeam1Picks(data);
    const matchesTeam2 = await pickHelpers.fetchTeam2Picks(data);
    const matches = {};
    let totalGames = 0;
    totalGames += pickHelpers.proccessMatches(data, matches, matchesTeam1);
    totalGames += pickHelpers.proccessMatches(
      data,
      matches,
      matchesTeam2,
      true
    );

    if (Object.keys(matches).length < 3) {
      if (
        Number(data.top1) === 0 ||
        Number(data.jungle1) === 0 ||
        Number(data.middle1) === 0 ||
        Number(data.bottom1) === 0 ||
        Number(data.utility1) === 0
      ) {
        const synergyMatches = await pickHelpers.fetchSynergyTeamPicks(data);
        totalGames += pickHelpers.proccessMatches(
          data,
          matches,
          synergyMatches
        );
      } else {
        const synergyMatches = await pickHelpers.fetchSynergyTeamPicks(
          data,
          true
        );
        totalGames += pickHelpers.proccessMatches(
          data,
          matches,
          synergyMatches,
          true
        );
      }
    }
    const matchesWithWinrate = pickHelpers.getMatchesWithWinrates(
      matches,
      totalGames
    );
    const sortedMatches = matchesWithWinrate.sort(function (a, b) {
      return a.pickQuality < b.pickQuality ? 1 : -1;
    });
    const best3Picks = sortedMatches.slice(0, 3);
    const allMatchupsCount = await Database.from("matchups").count();
    const count = allMatchupsCount[0]["count(*)"];
    response.status(200).send({ matchups: best3Picks, totalRecords: count });
  }

  async getTotalGames({ request, response }) {
    const allMatchupsCount = await Database.from("matchups").count();
    const count = allMatchupsCount[0]["count(*)"];
    response.status(200).send({ totalRecords: count });
  }

  async calculateWinrate({ request, response }) {
    const data = request.only([
      "top1",
      "jgl1",
      "mid1",
      "adc1",
      "sup1",
      "top2",
      "jgl2",
      "mid2",
      "adc2",
      "sup2",
    ]);
    let team1Wins = 0;
    let team2Wins = 0;

    for (let i = 0; i < 5; i++) {
      const roles = [0, 0, 0, 0, 0];
      roles[i] = 1;
      const matchups = await pickHelpers.fetchWinrateMatchups(roles, data);
      matchups.rows.forEach((match) => {
        team1Wins += match.team1_wins;
        team2Wins += match.team2_wins;
      });
      const matchupsReverse = await pickHelpers.fetchWinrateMatchups(
        roles,
        data,
        true
      );
      matchupsReverse.rows.forEach((match) => {
        team1Wins += match.team2_wins;
        team2Wins += match.team1_wins;
      });
    }

    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 5; j++) {
        const roles = [0, 0, 0, 0, 0];
        roles[i] = 1;
        roles[j] = 1;
        const matchups = await pickHelpers.fetchWinrateMatchups(roles, data);
        matchups.rows.forEach((match) => {
          team1Wins += match.team1_wins * 10;
          team2Wins += match.team2_wins * 10;
        });
        const matchupsReverse = await pickHelpers.fetchWinrateMatchups(
          roles,
          data,
          true
        );
        matchupsReverse.rows.forEach((match) => {
          team1Wins += match.team2_wins * 10;
          team2Wins += match.team1_wins * 10;
        });
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = i + 1; j < 4; j++) {
        for (let k = j + 1; k < 5; k++) {
          const roles = [0, 0, 0, 0, 0];
          roles[i] = 1;
          roles[j] = 1;
          roles[k] = 1;
          const matchups = await pickHelpers.fetchWinrateMatchups(roles, data);
          matchups.rows.forEach((match) => {
            team1Wins += match.team1_wins * 20;
            team2Wins += match.team2_wins * 20;
          });
          const matchupsReverse = await pickHelpers.fetchWinrateMatchups(
            roles,
            data,
            true
          );
          matchupsReverse.rows.forEach((match) => {
            team1Wins += match.team2_wins * 20;
            team2Wins += match.team1_wins * 20;
          });
        }
      }
    }

    for (let i = 0; i < 2; i++) {
      for (let j = i + 1; j < 3; j++) {
        for (let k = j + 1; k < 4; k++) {
          for (let p = k + 1; p < 5; p++) {
            const roles = [0, 0, 0, 0, 0];
            roles[i] = 1;
            roles[j] = 1;
            roles[k] = 1;
            roles[p] = 1;
            const matchups = await pickHelpers.fetchWinrateMatchups(
              roles,
              data
            );
            matchups.rows.forEach((match) => {
              team1Wins += match.team1_wins * 30;
              team2Wins += match.team2_wins * 30;
            });
            const matchupsReverse = await pickHelpers.fetchWinrateMatchups(
              roles,
              data,
              true
            );
            matchupsReverse.rows.forEach((match) => {
              team1Wins += match.team2_wins * 30;
              team2Wins += match.team1_wins * 30;
            });
          }
        }
      }
    }

    const matchups = await pickHelpers.fetchWinrateMatchups(
      [1, 1, 1, 1, 1],
      data
    );
    matchups.rows.forEach((match) => {
      team1Wins += match.team1_wins * 50;
      team2Wins += match.team2_wins * 50;
    });
    const matchupsReverse = await pickHelpers.fetchWinrateMatchups(
      [1, 1, 1, 1, 1],
      data,
      true
    );
    matchupsReverse.rows.forEach((match) => {
      team1Wins += match.team2_wins * 50;
      team2Wins += match.team1_wins * 50;
    });
    const totalGames = team1Wins + team2Wins;
    const team1Winrate = Number((team1Wins / totalGames) * 100).toFixed(2);
    const team2Winrate = Number((team2Wins / totalGames) * 100).toFixed(2);
    response.status(200).send({ team1Winrate, team2Winrate });
  }
}

module.exports = MatchupController;
