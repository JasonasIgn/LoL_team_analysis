"use strict";
const Axios = use("axios");
const Matchup = use("App/Models/Matchup");
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
    let matchupData = {
      team1_top: 0,
      team1_jungle: 0,
      team1_mid: 0,
      team1_adc: 0,
      team1_support: 0,
      team2_top: 0,
      team2_jungle: 0,
      team2_mid: 0,
      team2_adc: 0,
      team2_support: 0,
      team1_wins: 0,
      team2_wins: 0,
    };
    try {
      const config = await Config.first()
      config.gameId += 1;
      await config.save();
      const res = await Axios.get(
        `https://euw1.api.riotgames.com/lol/match/v4/matches/${config.gameId}`,
        {
          headers: {
            "X-Riot-Token": process.env.LOL_API_KEY,
          },
        }
      );

      const { data } = res;
      if (data.queueId === 420) {
        const team1Id = data.teams[0].teamId;
        const team1Win = data.teams[0].win === "Win";
        const team2Id = data.teams[1].teamId;
        const team2Win = data.teams[1].win === "Win";
        matchupData.team1_wins = team1Win ? 1 : 0;
        matchupData.team2_wins = team2Win ? 1 : 0;
        data.participants.forEach((participant) => {
          if (
            participant.timeline.role === "SOLO" &&
            participant.timeline.lane === "TOP"
          ) {
            if (participant.teamId === team1Id) {
              matchupData.team1_top = participant.championId;
            } else {
              matchupData.team2_top = participant.championId;
            }
          }
          if (
            participant.timeline.role === "NONE" &&
            participant.timeline.lane === "JUNGLE"
          ) {
            if (participant.teamId === team1Id) {
              matchupData.team1_jungle = participant.championId;
            } else {
              matchupData.team2_jungle = participant.championId;
            }
          }
          if (
            participant.timeline.role === "SOLO" &&
            participant.timeline.lane === "MIDDLE"
          ) {
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
        const match = await Matchup.findBy({
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
        if (match) {
          match.team1_wins += matchupData.team1_wins;
          match.team2_wins += matchupData.team2_wins;
          await match.save();
        } else {
          const match2 = await Matchup.findBy({
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
          if (match2) {
            match.team1_wins += matchupData.team2_wins;
            match.team2_wins += matchupData.team1_wins;
            await match.save();
          } else {
            console.log(data.gameId)
            await Matchup.create(matchupData);
          }
        }
        response.status(200).send({});
        return;
      }
      response.status(404).send({});
    } catch (e) {
      console.log(e.response.status)
      response.status(400).send({});
    }
  }
}

module.exports = MatchupController;
