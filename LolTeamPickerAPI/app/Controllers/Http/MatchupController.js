"use strict";

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

      if (playerMatchlistResponse.data.matches.length === 0) {
        response.status(200).send({ gameCollected: 0 });
        return;
      }

      const promises = playerMatchlistResponse.data.matches.map(
        async (match) => {
          const matchId = match.gameId;
          const hasBeenCraweled = await CrawledGame.findBy("gameId", matchId);
          if (Boolean(hasBeenCraweled)) return;

          await server.crawledGames().create({ gameId: matchId });
          const gameResponse = await requests.fetchMatchInfo(
            server.name,
            matchId
          );
          const { data } = gameResponse;
          let team1Champions = [];
          let team2Champions = [];

          const promises = data.participantIdentities.map(async (identity) => {
            const playerSummonerName = identity.player.summonerName;
            const alreadyAdded = await Player.findBy(
              "summoner_name",
              playerSummonerName
            );
            if (Boolean(alreadyAdded)) return;
            await server
              .players()
              .create({ summoner_name: playerSummonerName });
          });
          await Promise.all(promises);

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
      response.status(200).send({});
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
      console.log("SYNERGY INCLUDED");
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
    console.log(sortedMatches);
    const best3Picks = sortedMatches.slice(0, 3);
    const allMatchupsCount = await Database.from("matchups").count();
    const count = allMatchupsCount[0]["count(*)"];
    response.status(200).send({ matchups: best3Picks, totalRecords: count });
  }
}

module.exports = MatchupController;
