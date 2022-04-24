export function getStandardTimeStr(dateObj) {
  let month = dateObj.getMonth() + 1;
  let standardMonth = String(month);
  if (month < 10) standardMonth = "0" + standardMonth;
  let date = dateObj.getDate();
  let standardDate = String(date);
  if (date < 10) standardDate = "0" + standardDate;
  return dateObj.getFullYear() + "-" + standardMonth + "-" + standardDate;
}
