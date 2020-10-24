"use strict";

const Matchup = use("App/Models/Matchup");

async function storeMatch(matchupData) {
  try {
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
  } catch (e) {
    throw e;
  }
}

async function storeDecaCombinationMatchups(matchupData) {
  try {
    await storeMatch(matchupData);
  } catch (e) {
    throw e;
  }
}

async function storeMatchup(matchupData) {
  try {
    await storeDecaCombinationMatchups(matchupData);
  } catch (e) {
    throw e;
  }
}

module.exports = { storeMatchup };