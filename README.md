#Riot API 활용하기

**`MatchKillLog.js`** - 매치아이디, apikey를 기반으로 매치 내 킬로그를 배열로 반환

ex) `start.js`

```
const matchKillLog = require("./MatchKillLog");
const api_key = require("./api_key");

matchKillLog(MatchID, api_key).then((data) => {
  data.forEach((el) => console.log(el));
});
```
