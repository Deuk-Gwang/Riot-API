/**
 * 유저 정보가 객체(data: { puuid: '...', name: '소환사명', profileIconId: Number, summonerLevel: Number }) Promise로 반환합니다.
 * @param {string} summonerName 소환사명
 * @param {string} token API Token Key
 * @returns {object} Promise
 */
async function userSearch(summonerName, token) {
  const response = await fetch(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${token}`
  );
  const data = await response.json();
  const { puuid, name, profileIconId, summonerLevel } = data;
  return { puuid, name, profileIconId, summonerLevel };
}

module.exports = userSearch;
