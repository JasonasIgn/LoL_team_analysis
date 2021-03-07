const isDev = window.location.hostname.includes("localhost");
const hostname = isDev ? "localhost" : "212.24.110.117"
const port = "8080"
export const baseApiUrl = `http://${hostname}:${port}`

export const apiUrls = {
    collectMatchup: `${baseApiUrl}/matchup/collect`,
    fetchTotalGames: `${baseApiUrl}/matchup/totalGames`,
    fetchConfig: `${baseApiUrl}/config`,
    toggleRun: `${baseApiUrl}/config/toggle-running`,
    winrate: `${baseApiUrl}/matchup/winrate`,
    fetchChampions: 'http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/champion.json',
}