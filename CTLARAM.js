const matchKillLog = require("./MatchKillLog");
const api_key = require("./api_key");

matchKillLog("KR_6452960064", api_key).then((data) => {
  console.log(data);
});
