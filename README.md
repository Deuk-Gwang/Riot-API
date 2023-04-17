# Riot API 활용하기

**`MatchKillLog.js`** - 매치아이디, apikey를 기반으로 매치 내 킬로그를 배열로 반환
<br>

#### Return

`time` : 킬로그 발생 시간
`leftTo` : 맵 기준 백분율 x좌표(좌 > 우);

`botTo` : 맵 기준 백분율 y좌표(하 > 상);

<br><br>

**ex) `start.js`**

```
const matchKillLog = require("./MatchKillLog");
const api_key = require("./api_key");

matchKillLog(MatchID, api_key).then((data) => {
  data.forEach((el) => console.log(el));
});
```

**console**

```
{time: '2분 16초', leftTo: 55.13, botTo: 55.13}
{time: '3분 25초', leftTo: 24.84, botTo: 90.19}
{time: '6분 12초', leftTo: 82.56, botTo: 15.19}
{time: '8분 15초', leftTo: 29.19, botTo: 77.97}
{time: '8분 21초', leftTo: 26.99, botTo: 89.54}
{time: '8분 24초', leftTo: 28.33, botTo: 87.13}
{time: '9분 5초', leftTo: 60.31, botTo: 60.55}
{time: '9분 37초', leftTo: 75.56, botTo: 21.76}
{time: '10분 18초', leftTo: 50.56, botTo: 50.57}
{time: '10분 56초', leftTo: 88.07, botTo: 21.38}
{time: '10분 57초', leftTo: 87.86, botTo: 20.77}
{time: '11분 21초', leftTo: 24.82, botTo: 87.92}
{time: '12분 18초', leftTo: 87.58, botTo: 20.37}
{time: '12분 28초', leftTo: 29.01, botTo: 88.4}
{time: '13분 4초', leftTo: 43.34, botTo: 44.62}
{time: '15분 2초', leftTo: 73.72, botTo: 9.86}
```
