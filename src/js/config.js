//根据开发环境和生产环境配置不同的请求url
let host = process.env.development
  ? "http://localhost"
  : "http://116.205.171.68";
if (location.href.indexOf("hhlearn") !== -1) host = "http://www.hhlearn.cn";
let port = process.env.development ? "9090" : "8080";
let resourceUrlSuffix =
  host + ":" + port + (process.env.development ? "" : "/gamer") + "/resource";
export default {
  host,
  port,
  resourceUrlSuffix,
};
