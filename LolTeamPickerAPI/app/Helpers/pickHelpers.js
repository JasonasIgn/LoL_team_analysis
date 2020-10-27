"use strict";

const Matchup = use("App/Models/Matchup");
const utils = use("App/Helpers/utils");

async function fetchTeam1Picks(data) {
  return await Matchup.query()
    .where(
      "team1_top",
      Number(data.top1) === 0 || Number(data.top1) === -1 ? ">" : "=",
      Number(data.top1)
    )
    .where(
      "team1_jungle",
      Number(data.jungle1) === 0 || Number(data.jungle1) === -1 ? ">" : "=",
      Number(data.jungle1)
    )
    .where(
      "team1_mid",
      Number(data.middle1) === 0 || Number(data.middle1) === -1 ? ">" : "=",
      Number(data.middle1)
    )
    .where(
      "team1_adc",
      Number(data.bottom1) === 0 || Number(data.bottom1) === -1 ? ">" : "=",
      Number(data.bottom1)
    )
    .where(
      "team1_support",
      Number(data.utility1) === 0 || Number(data.utility1) === -1 ? ">" : "=",
      Number(data.utility1)
    )
    .where(
      "team2_top",
      Number(data.top2) === 0 || Number(data.top2) === -1 ? ">" : "=",
      Number(data.top2)
    )
    .where(
      "team2_jungle",
      Number(data.jungle2) === 0 || Number(data.jungle2) === -1 ? ">" : "=",
      Number(data.jungle2)
    )
    .where(
      "team2_mid",
      Number(data.middle2) === 0 || Number(data.middle2) === -1 ? ">" : "=",
      Number(data.middle2)
    )
    .where(
      "team2_adc",
      Number(data.bottom2) === 0 || Number(data.bottom2) === -1 ? ">" : "=",
      Number(data.bottom2)
    )
    .where(
      "team2_support",
      Number(data.utility2) === 0 || Number(data.utility2) === -1 ? ">" : "=",
      Number(data.utility2)
    )
    .fetch();
}

async function fetchTeam2Picks(data) {
  return await Matchup.query()
    .where(
      "team2_top",
      Number(data.top1) === 0 || Number(data.top1) === -1 ? ">" : "=",
      Number(data.top1)
    )
    .where(
      "team2_jungle",
      Number(data.jungle1) === 0 || Number(data.jungle1) === -1 ? ">" : "=",
      Number(data.jungle1)
    )
    .where(
      "team2_mid",
      Number(data.middle1) === 0 || Number(data.middle1) === -1 ? ">" : "=",
      Number(data.middle1)
    )
    .where(
      "team2_adc",
      Number(data.bottom1) === 0 || Number(data.bottom1) === -1 ? ">" : "=",
      Number(data.bottom1)
    )
    .where(
      "team2_support",
      Number(data.utility1) === 0 || Number(data.utility1) === -1 ? ">" : "=",
      Number(data.utility1)
    )
    .where(
      "team1_top",
      Number(data.top2) === 0 || Number(data.top2) === -1 ? ">" : "=",
      Number(data.top2)
    )
    .where(
      "team1_jungle",
      Number(data.jungle2) === 0 || Number(data.jungle2) === -1 ? ">" : "=",
      Number(data.jungle2)
    )
    .where(
      "team1_mid",
      Number(data.middle2) === 0 || Number(data.middle2) === -1 ? ">" : "=",
      Number(data.middle2)
    )
    .where(
      "team1_adc",
      Number(data.bottom2) === 0 || Number(data.bottom2) === -1 ? ">" : "=",
      Number(data.bottom2)
    )
    .where(
      "team1_support",
      Number(data.utility2) === 0 || Number(data.utility2) === -1 ? ">" : "=",
      Number(data.utility2)
    )
    .fetch();
}

async function fetchSynergyTeamPicks(data, team2 = false) {
  const top = Number(team2 ? data.top2 : data.top1);
  const jgl = Number(team2 ? data.jungle2 : data.jungle1);
  const mid = Number(team2 ? data.middle2 : data.middle1);
  const adc = Number(team2 ? data.bottom2 : data.bottom1);
  const sup = Number(team2 ? data.utility2 : data.utility1);
  return await Matchup.query()
    .where(
      `team${team2 ? "2" : "1"}_top`,
      top === 0 || top === -1 ? ">" : "=",
      top
    )
    .where(
      `team${team2 ? "2" : "1"}_jungle`,
      jgl === 0 || jgl === -1 ? ">" : "=",
      jgl
    )
    .where(
      `team${team2 ? "2" : "1"}_mid`,
      mid === 0 || mid === -1 ? ">" : "=",
      mid
    )
    .where(
      `team${team2 ? "2" : "1"}_adc`,
      adc === 0 || adc === -1 ? ">" : "=",
      adc
    )
    .where(
      `team${team2 ? "2" : "1"}_support`,
      sup === 0 || sup === -1 ? ">" : "=",
      sup
    )
    .fetch();
}

async function fetchWinrateMatchups(
  roles = [0, 0, 0, 0, 0],
  matchupData,
  reverse = false
) {
  const top = Boolean(roles[0]);
  const jgl = Boolean(roles[1]);
  const mid = Boolean(roles[2]);
  const adc = Boolean(roles[3]);
  const sup = Boolean(roles[4]);
  return await Matchup.query()
    .where(
      `team${reverse ? "2" : "1"}_top`,
      top ? "=" : ">",
      top ? matchupData.top1 : -1
    )
    .where(
      `team${reverse ? "2" : "1"}_jungle`,
      jgl ? "=" : ">",
      jgl ? matchupData.jgl1 : -1
    )
    .where(
      `team${reverse ? "2" : "1"}_mid`,
      mid ? "=" : ">",
      mid ? matchupData.mid1 : -1
    )
    .where(
      `team${reverse ? "2" : "1"}_adc`,
      adc ? "=" : ">",
      adc ? matchupData.adc1 : -1
    )
    .where(
      `team${reverse ? "2" : "1"}_support`,
      sup ? "=" : ">",
      sup ? matchupData.sup1 : -1
    )
    .where(
      `team${reverse ? "1" : "2"}_top`,
      top ? "=" : ">",
      top ? matchupData.top2 : -1
    )
    .where(
      `team${reverse ? "1" : "2"}_jungle`,
      jgl ? "=" : ">",
      jgl ? matchupData.jgl2 : -1
    )
    .where(
      `team${reverse ? "1" : "2"}_mid`,
      mid ? "=" : ">",
      mid ? matchupData.mid2 : -1
    )
    .where(
      `team${reverse ? "1" : "2"}_adc`,
      adc ? "=" : ">",
      adc ? matchupData.adc2 : -1
    )
    .where(
      `team${reverse ? "1" : "2"}_support`,
      sup ? "=" : ">",
      sup ? matchupData.sup2 : -1
    )
    .fetch();
}

function proccessMatches(data, mutableResults, foundMatches, reverseTeams) {
  let gamesObject = { total: 0 };
  foundMatches.rows.forEach((match) => {
    const pick = match[utils.getWantedChampMatchupRole(data)];
    gamesObject.total += match.team1_wins + match.team2_wins;
    if (mutableResults[pick]) {
      mutableResults[pick].wins += reverseTeams
        ? match.team2_wins
        : match.team1_wins;
      mutableResults[pick].totalGames += match.team1_wins + match.team2_wins;
    } else {
      mutableResults[pick] = {
        pick,
        wins: reverseTeams ? match.team2_wins : match.team1_wins,
        totalGames: match.team1_wins + match.team2_wins,
      };
    }
  });
  return gamesObject.total;
}

function getMatchesWithWinrates(matches, totalGames) {
  return Object.values(matches).map((match) => {
    const winrate = Number(((match.wins / match.totalGames) * 100).toFixed(2));
    return {
      pick: match.pick,
      winrate,
      totalGames: match.totalGames,
      pickQuality: Number(
        (
          winrate *
          (match.totalGames / totalGames) *
          utils.getPickQualityMultiplier(winrate) *
          utils.getQuantityMultiplier(match.totalGames)
        ).toFixed(2)
      ),
    };
  });
}

module.exports = {
  fetchTeam1Picks,
  fetchTeam2Picks,
  fetchSynergyTeamPicks,
  proccessMatches,
  getMatchesWithWinrates,
  fetchWinrateMatchups,
};
