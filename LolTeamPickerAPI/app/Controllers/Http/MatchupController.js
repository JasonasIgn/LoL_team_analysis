"use strict";
const Axios = use("axios");
const Matchup = use("App/Models/Matchup");
const Server = use("App/Models/Server");
const Player = use("App/Models/Player");
const CrawledGame = use("App/Models/CrawledGame");
const crawlHelpers = use("App/Helpers/crawlHelpers");
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
      if (!Boolean(serverPlayerToCrawl))
      {
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
        }.api.riotgames.com/lol/match/v4/matchlists/by-account/${playerAccountId}?queue=420&endTime=${new Date().getTime()}&beginTime=${new Date().setDate(
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

      playerMatchlistResponse.data.matches.forEach(async (match) => {
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
        let matchupData = {
          team1_top: -1,
          team1_jungle: -1,
          team1_mid: -1,
          team1_adc: -1,
          team1_support: -1,
          team2_top: -1,
          team2_jungle: -1,
          team2_mid: -1,
          team2_adc: -1,
          team2_support: -1,
          team1_wins: 0,
          team2_wins: 0,
        };
        const { data } = gameResponse;
        const team1Id = data.teams[0].teamId;
        const team1Win = data.teams[0].win === "Win";
        const team2Id = data.teams[1].teamId;
        const team2Win = data.teams[1].win === "Win";
        matchupData.team1_wins = team1Win ? 1 : 0;
        matchupData.team2_wins = team2Win ? 1 : 0;

        data.participantIdentities.forEach(async (identity) => {
          const playerSummonerName = identity.player.summonerName;
          const alreadyAdded = await Player.findBy(
            "summoner_name",
            playerSummonerName
          );
          if (Boolean(alreadyAdded)) return;
          await server.players().create({ summoner_name: playerSummonerName });
        });

        data.participants.forEach((participant) => {
          if (participant.timeline.lane === "TOP") {
            if (participant.teamId === team1Id) {
              matchupData.team1_top = participant.championId;
            } else {
              matchupData.team2_top = participant.championId;
            }
          }
          if (participant.timeline.lane === "JUNGLE") {
            if (participant.teamId === team1Id) {
              matchupData.team1_jungle = participant.championId;
            } else {
              matchupData.team2_jungle = participant.championId;
            }
          }
          if (participant.timeline.lane === "MIDDLE") {
            if (participant.teamId === team1Id) {
              matchupData.team1_mid = participant.championId;
            } else {
              matchupData.team2_mid = participant.championId;
            }
          }
          if (
            participant.timeline.role === "DUO_CARRY" &&
            participant.timeline.lane === "BOTTOM"
          ) {
            if (participant.teamId === team1Id) {
              matchupData.team1_adc = participant.championId;
            } else {
              matchupData.team2_adc = participant.championId;
            }
          }
          if (
            participant.timeline.role === "DUO_SUPPORT" &&
            participant.timeline.lane === "BOTTOM"
          ) {
            if (participant.teamId === team1Id) {
              matchupData.team1_support = participant.championId;
            } else {
              matchupData.team2_support = participant.championId;
            }
          }
        });
        if (
          [
            matchupData.team1_adc,
            matchupData.team1_jungle,
            matchupData.team1_mid,
            matchupData.team1_support,
            matchupData.team1_top,
            matchupData.team2_adc,
            matchupData.team2_jungle,
            matchupData.team2_mid,
            matchupData.team2_support,
            matchupData.team2_top,
          ].includes(-1)
        ) {
          return;
        }

        const existingMatch = await Matchup.findBy({
          team1_top: matchupData.team1_top,
          team1_jungle: matchupData.team1_jungle,
          team1_mid: matchupData.team1_mid,
          team1_adc: matchupData.team1_adc,
          team1_support: matchupData.team1_support,
          team2_top: matchupData.team2_top,
          team2_jungle: matchupData.team2_jungle,
          team2_mid: matchupData.team2_mid,
          team2_adc: matchupData.team2_adc,
          team2_support: matchupData.team2_support,
        });

        if (existingMatch) {
          existingMatch.team1_wins += matchupData.team1_wins;
          existingMatch.team2_wins += matchupData.team2_wins;
          await existingMatch.save();
        } else {
          const existingMatch2 = await Matchup.findBy({
            team2_top: matchupData.team1_top,
            team2_jungle: matchupData.team1_jungle,
            team2_mid: matchupData.team1_mid,
            team2_adc: matchupData.team1_adc,
            team2_support: matchupData.team1_support,
            team1_top: matchupData.team2_top,
            team1_jungle: matchupData.team2_jungle,
            team1_mid: matchupData.team2_mid,
            team1_adc: matchupData.team2_adc,
            team1_support: matchupData.team2_support,
          });
          if (existingMatch2) {
            existingMatch2.team1_wins += matchupData.team2_wins;
            existingMatch2.team2_wins += matchupData.team1_wins;
            await existingMatch2.save();
          } else {
            await Matchup.create(matchupData);
          }
        }
      });

      response.status(200).send({});
    } catch (e) {
      console.log(e);
      response.status(400).send({});
    }
  }
}

module.exports = MatchupController;
