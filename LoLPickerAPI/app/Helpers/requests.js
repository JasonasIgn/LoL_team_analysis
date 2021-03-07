const Axios = use("axios");
const Env = use("Env");

async function fetchPlayerMatchlist(serverName, accountId) {
  return await Axios.get(
    `https://${serverName}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?queue=420&beginTime=${new Date().setDate(
      new Date().getDate() - 7
    )}&endIndex=15&beginIndex=0`,
    {
      headers: {
        "X-Riot-Token": Env.get("LOL_API_KEY"),
      },
    }
  );
}

async function fetchPlayerInfo(serverName, summonerName) {
  return await Axios.get(
    `https://${serverName}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
      summonerName
    )}`,
    {
      headers: {
        "X-Riot-Token": Env.get("LOL_API_KEY"),
      },
    }
  );
}

async function fetchMatchInfo(serverName, matchId) {
  return await Axios.get(
    `https://${serverName}.api.riotgames.com/lol/match/v4/matches/${matchId}`,
    {
      headers: {
        "X-Riot-Token": Env.get("LOL_API_KEY"),
      },
    }
  );
}

module.exports = {
  fetchPlayerMatchlist,
  fetchPlayerInfo,
  fetchMatchInfo,
};
