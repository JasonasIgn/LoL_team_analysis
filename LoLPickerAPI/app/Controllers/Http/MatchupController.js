"use strict";

const Database = use("Database");
const Server = use("App/Models/Server");
const crawlHelpers = use("App/Helpers/crawlHelpers");
const pickHelpers = use("App/Helpers/pickHelpers");
const roleIdentification = use("App/Helpers/roleIdentification");
const Config = use("Config");
const picksType = Config.get("constants").picksType;

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
      const servers = await Server.all();

      await Promise.all(
        servers.rows.map(async (server) => {
          try {
            if (server.missing_players) {
              throw Error(`Missing players for server: ${server.name}`);
            }
            const player = await server
              .players()
              .where("crawled", false)
              .first();
            if (!player) {
              server.missing_players = true;
              await server.save();
              throw Error(`Missing players for server: ${server.name}`);
            }
            const collected = await crawlHelpers.crawlPlayer(
              player,
              server,
              championRoles
            );
            gamesCollected += collected;
            console.log(collected, "games collected from server", server.name);
          } catch (e) {}
        })
      );
      response.status(200).send({
        gamesCollected,
      });
    } catch (e) {
      response.status(400).send({});
    }
  }

  async whatDoIPlay({ request, response }) {
    let type = picksType.COUNTER;
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
    pickHelpers.excludeWeakPicks(matches);
    //If these's no counter matches get synergy
    if (Object.keys(matches).length === 0) {
      if (
        Number(data.top1) === 0 ||
        Number(data.jungle1) === 0 ||
        Number(data.middle1) === 0 ||
        Number(data.bottom1) === 0 ||
        Number(data.utility1) === 0
      ) {
        type = picksType.SYNERGY;
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
      pickHelpers.excludeWeakPicks(matches);
    }
    //If there's no synergy matches get overall
    if (Object.keys(matches).length === 0) {
      type = picksType.OVERALL;
      const matchesTeam1 = await pickHelpers.fetchOverallTeamPicks(data);
      const matchesTeam2 = await pickHelpers.fetchOverallTeamPicks(data, true);
      totalGames += pickHelpers.proccessMatches(data, matches, matchesTeam1);
      totalGames += pickHelpers.proccessMatches(data, matches, matchesTeam2);
      pickHelpers.excludeWeakPicks(matches);
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
    response
      .status(200)
      .send({ matchups: best3Picks, totalRecords: count, type: Env.get("MYSQL_ROOT_PASSWORD") });
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
