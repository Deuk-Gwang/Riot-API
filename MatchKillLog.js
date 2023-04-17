/**
 * ms단위를 시분초 단위로 변환해주는 함수
 * @param {number} ms 매치시간의 ms
 * @returns {string} 'N분 N초'
 * */
function msToRealTime(ms) {
  let second = Math.floor(ms / 1000);
  let minute = Math.floor(second / 60); // 분
  let restSecond = second - minute * 60;
  return `${minute}분 ${restSecond}초`;
}

module.exports = msToRealTime;

const min = { x: -120, y: -120 };
const max = { x: 14870, y: 14980 };
const xyLength = { x: Math.abs(min.x) + max.x, y: Math.abs(min.y) + max.y };

/**
 * 소환사의 협곡 킬 이벤트 좌표를 미니맵기준 %로 구하는 함수
 * @param {number} apiX response data 내 x값
 * @param {number} apiY response data 내 y값
 * @returns {object} { x: 변환된 x값, y: 변환된 y값 }
 * */
function coordinateToLocation(apiX, apiY) {
  let convertedX = Math.round((apiX / xyLength.x) * 10000) / 100;
  let convertedY = Math.round((apiY / xyLength.y) * 10000) / 100;

  return { x: convertedX, y: convertedY };
}

/**
 * [소환사의 협곡] 이 함수는 Match Id와 API Key를 파라미터로 받아 게임 중 발생한 킬이벤트를 배열 내
 * 객체(data: [ { time: 'n분 n초', leftTo: 백분율된 x좌표, botTo: 백분율된 y좌표 }, ... ]를 Promise로 반환합니다.
 * @param {string} matchId - Match Id
 * @param {string} token - Riot API Key
 * @returns {object} Promise
 */
async function matchKillLog(matchId, token) {
  const res = await fetch(
    `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${token}`
  );
  const data = await res.json();
  const allData = data.info.frames;
  let logData = [];
  allData.forEach((element) => {
    element.events.forEach((element2) => {
      if (element2.type === "CHAMPION_KILL") {
        const { x, y } = element2.position;
        const location = coordinateToLocation(x, y); // 객체를 반환
        const killtime = msToRealTime(element2.timestamp);
        logData.push({
          time: killtime,
          leftTo: location.x,
          botTo: location.y,
        });
      }
    });
  });
  return logData;
}

module.exports = matchKillLog;
