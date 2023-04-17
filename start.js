const matchKillLog = require("./MatchKillLog");
const api_key = require("./api_key");
const matchGet = require("./matchGet");
const userSearch = require("./userSearch");

/**
 * 특정 소환사의 최근게임 킬로그 검색
 * @param {string} searchName 검색할 소환사 이름
 * @param {number} matchCount 검색할 게임의 수 (1~100)
 * @param {string} token API Token Key
 * @returns
 */
async function summonerGameInfo(searchName, matchCount, token) {
  const userInfo = await userSearch(searchName, token);
  const recentGame = await matchGet(userInfo.puuid, matchCount, token);
  const killLog = [];

  for (let game of recentGame) {
    const log = await matchKillLog(game, token);
    killLog.push(log);
  }

  return killLog;
}

summonerGameInfo("정 득 광", 2, api_key).then((data) => console.log(data));
