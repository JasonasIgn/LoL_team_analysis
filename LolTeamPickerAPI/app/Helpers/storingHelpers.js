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
function getResetMatchupData(matchupData, resetPositionsArray) {
  const newMatchupData = { ...matchupData };
  if (resetPositionsArray[0]) {
    newMatchupData.team1_top = -1;
  }
  if (resetPositionsArray[1]) {
    newMatchupData.team1_jungle = -1;
  }
  if (resetPositionsArray[2]) {
    newMatchupData.team1_mid = -1;
  }
  if (resetPositionsArray[3]) {
    newMatchupData.team1_adc = -1;
  }
  if (resetPositionsArray[4]) {
    newMatchupData.team1_support = -1;
  }
  if (resetPositionsArray[5]) {
    newMatchupData.team2_top = -1;
  }
  if (resetPositionsArray[6]) {
    newMatchupData.team2_jungle = -1;
  }
  if (resetPositionsArray[7]) {
    newMatchupData.team2_mid = -1;
  }
  if (resetPositionsArray[8]) {
    newMatchupData.team2_adc = -1;
  }
  if (resetPositionsArray[9]) {
    newMatchupData.team2_support = -1;
  }
  return newMatchupData;
}

async function storeSingleCombinationMatchups(matchupData) {
  try {
    for (let i = 0; i < 10; i++) {
      const positions = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      positions[i] = 0;
      const alteredMatchupData = getResetMatchupData(matchupData, positions);
      await storeMatch(alteredMatchupData);
      setTimeout(() => {}, 100);
    }
  } catch (e) {
    throw e;
  }
}

async function storeDoubleCombinationMatchups(matchupData) {
  try {
    for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 10; j++) {
        const positions = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        positions[i] = 0;
        positions[j] = 0;
        const alteredMatchupData = getResetMatchupData(matchupData, positions);
        await storeMatch(alteredMatchupData);
        setTimeout(() => {}, 100);
      }
    }
  } catch (e) {
    throw e;
  }
}

async function storeTripleCombinationMatchups(matchupData) {
  try {
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 9; j++) {
        for (let k = j + 1; k < 10; k++) {
          const positions = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
          positions[i] = 0;
          positions[j] = 0;
          positions[k] = 0;
          const alteredMatchupData = getResetMatchupData(
            matchupData,
            positions
          );
          await storeMatch(alteredMatchupData);
          setTimeout(() => {}, 100);
        }
      }
    }
  } catch (e) {
    throw e;
  }
}

async function storeQuadrupleCombinationMatchups(matchupData) {
  try {
    for (let i = 0; i < 7; i++) {
      for (let j = i + 1; j < 8; j++) {
        for (let k = j + 1; k < 9; k++) {
          for (let l = k + 1; l < 10; l++) {
            const positions = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            positions[i] = 0;
            positions[j] = 0;
            positions[k] = 0;
            positions[l] = 0;
            const alteredMatchupData = getResetMatchupData(
              matchupData,
              positions
            );
            await storeMatch(alteredMatchupData);
            setTimeout(() => {}, 100);
          }
        }
      }
    }
  } catch (e) {
    throw e;
  }
}

async function storePentaCombinationMatchups(matchupData) {
  try {
    for (let i = 0; i < 6; i++) {
      for (let j = i + 1; j < 7; j++) {
        for (let k = j + 1; k < 8; k++) {
          for (let l = k + 1; l < 9; l++) {
            for (let p = l + 1; p < 10; p++) {
              const positions = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
              positions[i] = 0;
              positions[j] = 0;
              positions[k] = 0;
              positions[l] = 0;
              positions[p] = 0;
              const alteredMatchupData = getResetMatchupData(
                matchupData,
                positions
              );
              await storeMatch(alteredMatchupData);
              setTimeout(() => {}, 100);
            }
          }
        }
      }
    }
  } catch (e) {
    throw e;
  }
}

async function storeHexaCombinationMatchups(matchupData) {
  try {
    for (let i = 0; i < 7; i++) {
      for (let j = i + 1; j < 8; j++) {
        for (let k = j + 1; k < 9; k++) {
          for (let l = k + 1; l < 10; l++) {
            const positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            positions[i] = 1;
            positions[j] = 1;
            positions[k] = 1;
            positions[l] = 1;
            const alteredMatchupData = getResetMatchupData(
              matchupData,
              positions
            );
            await storeMatch(alteredMatchupData);
            setTimeout(() => {}, 100);
          }
        }
      }
    }
  } catch (e) {
    throw e;
  }
}

async function storeHeptaCombinationMatchups(matchupData) {
  try {
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 9; j++) {
        for (let k = j + 1; k < 10; k++) {
          const positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          positions[i] = 1;
          positions[j] = 1;
          positions[k] = 1;
          const alteredMatchupData = getResetMatchupData(
            matchupData,
            positions
          );
          await storeMatch(alteredMatchupData);
          setTimeout(() => {}, 100);
        }
      }
    }
  } catch (e) {
    throw e;
  }
}

async function storeOctaCombinationMatchups(matchupData) {
  try {
    for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 10; j++) {
        const positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        positions[i] = 1;
        positions[j] = 1;
        const alteredMatchupData = getResetMatchupData(matchupData, positions);
        await storeMatch(alteredMatchupData);
        setTimeout(() => {}, 100);
      }
    }
  } catch (e) {
    throw e;
  }
}

async function storeNonaCombinationMatchups(matchupData) {
  try {
    for (let i = 0; i < 10; i++) {
      const positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      positions[i] = 1;
      const alteredMatchupData = getResetMatchupData(matchupData, positions);
      await storeMatch(alteredMatchupData);
      setTimeout(() => {}, 100);
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
    // await storeSingleCombinationMatchups(matchupData);
    // await storeDoubleCombinationMatchups(matchupData);
    // await storeTripleCombinationMatchups(matchupData);
    // await storeQuadrupleCombinationMatchups(matchupData);
    // await storePentaCombinationMatchups(matchupData);
    // await storeHexaCombinationMatchups(matchupData);
    // await storeHeptaCombinationMatchups(matchupData);
    // await storeOctaCombinationMatchups(matchupData);
    // await storeNonaCombinationMatchups(matchupData);
    await storeDecaCombinationMatchups(matchupData);
  } catch (e) {
    throw e;
  }
}

module.exports = { storeMatchup };