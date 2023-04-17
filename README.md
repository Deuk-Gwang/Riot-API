# Riot API 활용하기

### Document List

- `userSearch.js` - **소환사명**, **apikey**를 기반으로 소환사의 정보를 객체로 반환
- `matchGet.js` - **소환사 puuid**, **조회할 게임 수**, **apikey**를 기반으로 유저의 최근게임 매치아이디를 배열로 반환
- `MatchKillLog.js` - **매치아이디**, **apikey**를 기반으로 매치 내 **킬로그를 배열로 반환**
- `api_key.js` - **Riot API Key**
- `start.js` - 실행예시 파일
  <br><br>

### Return

#### userSearch.js

객체를 반환

- `puuid` : 검색한 소환사의 puuid
- `name` : 소환사명
- `profileIconId` : 소환사 아이콘
- `summonerLevel` : 소환사 레벨
  <br>

#### matchGet.js

배열을 반환

- 입력한 `gameCount`만큼 Match id 조회 (최대 100게임)
  <br>

#### MatchKillLog.js

배열 내 객체를 반환

- `time` : 킬로그 발생 시간
- `leftTo` : 맵 기준 백분율 x좌표(좌 > 우);
- `botTo` : 맵 기준 백분율 y좌표(하 > 상);
  <br><br>

#### start.js 실행예시

```
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
```

**console.log(data)**

```
[
  [
    {time: '2분 16초', leftTo: 55.13, botTo: 55.13},
    {time: '3분 25초', leftTo: 24.84, botTo: 90.19},
    {time: '6분 12초', leftTo: 82.56, botTo: 15.19},
    ...
  ],
  [
    {time: '2분 16초', leftTo: 55.13, botTo: 55.13},
    {time: '3분 25초', leftTo: 24.84, botTo: 90.19},
    {time: '6분 12초', leftTo: 82.56, botTo: 15.19},
    ...
  ]
]
```
