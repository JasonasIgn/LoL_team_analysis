"use strict";

module.exports = {
  getWantedChampMatchupRole(requestData, reverse) {
    if (
      (reverse && Number(requestData.top2) === 0) ||
      (!reverse && Number(requestData.top1) === 0)
    )
      return "team1_top";
    if (
      (reverse && Number(requestData.jungle2) === 0) ||
      (!reverse && Number(requestData.jungle1) === 0)
    )
      return "team1_jungle";
    if (
      (reverse && Number(requestData.middle2) === 0) ||
      (!reverse && Number(requestData.middle1) === 0)
    )
      return "team1_mid";
    if (
      (reverse && Number(requestData.bottom2) === 0) ||
      (!reverse && Number(requestData.bottom1) === 0)
    )
      return "team1_adc";
    if (
      (reverse && Number(requestData.utility2) === 0) ||
      (!reverse && Number(requestData.utility1) === 0)
    )
      return "team1_support";
    if (
      (reverse && Number(requestData.top1) === 0) ||
      (!reverse && Number(requestData.top2) === 0)
    )
      return "team2_top";
    if (
      (reverse && Number(requestData.jungle1) === 0) ||
      (!reverse && Number(requestData.jungle2) === 0)
    )
      return "team2_jungle";
    if (
      (reverse && Number(requestData.middle1) === 0) ||
      (!reverse && Number(requestData.middle2) === 0)
    )
      return "team2_mid";
    if (
      (reverse && Number(requestData.bottom1) === 0) ||
      (!reverse && Number(requestData.bottom2) === 0)
    )
      return "team2_adc";
    if (
      (reverse && Number(requestData.utility1) === 0) ||
      (!reverse && Number(requestData.utility2) === 0)
    )
      return "team2_support";
  },

  getPickQualityMultiplier(winrate) {
    if (winrate < 50) {
      return 0.01;
    }
    if (winrate >= 55 && winrate < 60) {
      return 1.1;
    }
    if (winrate >= 60 && winrate < 65) {
      return 1.4;
    }
    if (winrate >= 65 && winrate < 70) {
      return 1.6;
    }
    if (winrate >= 70 && winrate < 75) {
      return 1.8;
    }
    if (winrate >= 75 && winrate < 80) {
      return 2;
    }
    if (winrate >= 80 && winrate < 85) {
      return 2.2;
    }
    if (winrate >= 85 && winrate < 90) {
      return 2.4;
    }
    if (winrate >= 90) {
      return 2.6;
    }
    return 1;
  },

  getQuantityMultiplier(count) {
    if (count < 5) {
      return 0.2;
    }
    if (count < 10) {
      return 0.5;
    }
    if (count < 20) {
      return 0.9;
    }
    if (count < 30) {
      return 0.95;
    }
    if (count < 40) {
      return 1;
    }
    if (count <= 50) {
      return 1.3;
    }
    return 1.5;
  },

  assignMatchupData(team1Roles, team2Roles, team1Win) {
    return {
      team1_top: team1Roles.TOP,
      team1_jungle: team1Roles.JUNGLE,
      team1_mid: team1Roles.MIDDLE,
      team1_adc: team1Roles.BOTTOM,
      team1_support: team1Roles.UTILITY,
      team2_top: team2Roles.TOP,
      team2_jungle: team2Roles.JUNGLE,
      team2_mid: team2Roles.MIDDLE,
      team2_adc: team2Roles.BOTTOM,
      team2_support: team2Roles.UTILITY,
      team1_wins: team1Win ? 1 : 0,
      team2_wins: team1Win ? 0 : 1,
    };
  },
};
