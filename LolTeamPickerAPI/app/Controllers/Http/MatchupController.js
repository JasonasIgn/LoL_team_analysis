"use strict";

const { match } = require("@adonisjs/framework/src/Route/Manager");

const Axios = use("axios");
const Server = use("App/Models/Server");
const Player = use("App/Models/Player");
const CrawledGame = use("App/Models/CrawledGame");
const crawlHelpers = use("App/Helpers/crawlHelpers");
const roleIdentification = use("App/Helpers/roleIdentification");
const storing = use("App/Helpers/storingHelpers");
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
      // console.log(championRoles)
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
      const playerResponse = await Axios.get(
        `https://${
          server.name
        }.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
          serverPlayerToCrawl.summoner_name
        )}`,
        {
          headers: {
            "X-Riot-Token": process.env.LOL_API_KEY,
          },
        }
      );
      const playerAccountId = playerResponse.data.accountId;
      const playerMatchlistResponse = await Axios.get(
        `https://${
          server.name
        }.api.riotgames.com/lol/match/v4/matchlists/by-account/${playerAccountId}?queue=420&beginTime=${new Date().setDate(
          new Date().getDate() - 7
        )}&endIndex=10&beginIndex=0`,
        {
          headers: {
            "X-Riot-Token": process.env.LOL_API_KEY,
          },
        }
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
          const gameResponse = await Axios.get(
            `https://${server.name}.api.riotgames.com//lol/match/v4/matches/${matchId}`,
            {
              headers: {
                "X-Riot-Token": process.env.LOL_API_KEY,
              },
            }
          );
          let matchupData = {};
          const { data } = gameResponse;
          let team1Champions = [];
          let team2Champions = [];
          const team1Id = data.teams[0].teamId;
          const team1Win = data.teams[0].win === "Win";
          const team2Id = data.teams[1].teamId;
          const team2Win = data.teams[1].win === "Win";
          matchupData.team1_wins = team1Win ? 1 : 0;
          matchupData.team2_wins = team2Win ? 1 : 0;

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

          matchupData.team1_top = team1Roles.TOP;
          matchupData.team1_jungle = team1Roles.JUNGLE;
          matchupData.team1_mid = team1Roles.MIDDLE;
          matchupData.team1_adc = team1Roles.BOTTOM;
          matchupData.team1_support = team1Roles.UTILITY;
          matchupData.team2_top = team2Roles.TOP;
          matchupData.team2_jungle = team2Roles.JUNGLE;
          matchupData.team2_mid = team2Roles.MIDDLE;
          matchupData.team2_adc = team2Roles.BOTTOM;
          matchupData.team2_support = team2Roles.UTILITY;

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
}

module.exports = MatchupController;
