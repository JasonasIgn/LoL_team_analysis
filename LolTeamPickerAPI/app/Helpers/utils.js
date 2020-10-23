"use strict";

module.exports = {
  getWantedChampMatchupRole(requestData, reverse) {
    if (
      (reverse && Number(requestData.top2) === 0) ||
      (!reverse && Number(requestData.top1) === 0)
    )
      return "team1_top";
    if (
      (reverse && Number(requestData.jgl2) === 0) ||
      (!reverse && Number(requestData.jgl1) === 0)
    )
      return "team1_jungle";
    if (
      (reverse && Number(requestData.mid2) === 0) ||
      (!reverse && Number(requestData.mid1) === 0)
    )
      return "team1_mid";
    if (
      (reverse && Number(requestData.adc2) === 0) ||
      (!reverse && Number(requestData.adc1) === 0)
    )
      return "team1_adc";
    if (
      (reverse && Number(requestData.sup2) === 0) ||
      (!reverse && Number(requestData.sup1) === 0)
    )
      return "team1_support";
    if (
      (reverse && Number(requestData.top1) === 0) ||
      (!reverse && Number(requestData.top2) === 0)
    )
      return "team2_top";
    if (
      (reverse && Number(requestData.jgl1) === 0) ||
      (!reverse && Number(requestData.jgl2) === 0)
    )
      return "team2_jungle";
    if (
      (reverse && Number(requestData.mid1) === 0) ||
      (!reverse && Number(requestData.mid2) === 0)
    )
      return "team2_mid";
    if (
      (reverse && Number(requestData.adc1) === 0) ||
      (!reverse && Number(requestData.adc2) === 0)
    )
      return "team2_adc";
    if (
      (reverse && Number(requestData.sup1) === 0) ||
      (!reverse && Number(requestData.sup2) === 0)
    )
      return "team2_support";
  },
};
