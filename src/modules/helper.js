import { fromUnixTime, getHours } from "date-fns";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";
import iconsName from "./Icons";

function convertToHour(unix, data) {
  const date = fromUnixTime(unix);
  const utcTime = zonedTimeToUtc(
    date,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const zoneTime = utcToZonedTime(utcTime, data.timezone);
  let hour = getHours(zoneTime);

  hour = hour + ":00";
  return hour;
}

function getTimeOfDay(unix, data) {
  let hour = convertToHour(unix, data);
  let array = hour.split("");
  array.splice(array.length - 3, 3);
  let fullHour = array.join("");

  if (6 > fullHour || fullHour > 22) {
    return "night";
  } else {
    return "day";
  }
}

function convertToDay(unix) {
  const date = fromUnixTime(unix);
  const day = date.toString().substring(0, 3);
  return day;
}

function getIcon(data) {
  const prefix = "wi-";
  let iconName = data.id;
  let icon = prefix + iconsName[iconName];

  return icon;
}

export { convertToHour, convertToDay, getIcon, getTimeOfDay };
