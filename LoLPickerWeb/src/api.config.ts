export const baseApiUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`

export const apiUrls = {
    collectMatchup: `${baseApiUrl}/matchup/collect`,
    fetchTotalGames: `${baseApiUrl}/matchup/totalGames`,
    winrate: `${baseApiUrl}/matchup/winrate`,
    fetchChampions: 'http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/champion.json',
}