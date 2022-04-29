import globalConfig from "./config";

export function getStandardTimeStr(dateObj, withHMS = false) {
  if (!(dateObj instanceof Date)) return "";
  let month = dateObj.getMonth() + 1;
  let standardMonth = String(month);
  if (month < 10) standardMonth = "0" + standardMonth;
  let date = dateObj.getDate();
  let standardDate = String(date);
  if (date < 10) standardDate = "0" + standardDate;
  let result = dateObj.getFullYear() + "-" + standardMonth + "-" + standardDate;
  if (withHMS) {
    let hour = dateObj.getHours();
    let standardHour = hour < 10 ? "0" + hour : hour;
    let min = dateObj.getMinutes();
    let standardMin = min < 10 ? "0" + min : min;
    let second = dateObj.getSeconds();
    let standardSecond = second < 10 ? "0" + second : second;
    result += " " + standardHour + ":" + standardMin + ":" + standardSecond;
  }
  return result;
}

export function buildAvatarSrc(uid, avatarUrl) {
  return avatarUrl
    ? globalConfig.resourceUrlSuffix + "/user/" + uid + "/" + avatarUrl
    : globalConfig.resourceUrlSuffix + "/public/avatar-default.png";
}
