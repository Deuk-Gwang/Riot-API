/**
 * puuid 기반 유저의 최근게임 정보가 배열['match1', 'match2', ...] Promise로 반환합니다.
 * @param {string} userPuuid 소환사 puuid
 * @param {number} gameCount 조회할 게임 수
 * @param {string} token API Token Key
 * @returns {array} Promise
 */
async function matchGet(userPuuid, gameCount, token) {
  const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${userPuuid}/ids?start=0&count=${gameCount}&api_key=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

module.exports = matchGet;
