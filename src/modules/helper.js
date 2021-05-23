import { fromUnixTime, getHours } from "date-fns";
import iconsName from "./Icons";

function convertToHour(unix) {
  const date = fromUnixTime(unix);
  let hour = getHours(date);

  if (hour < 12) {
    hour = hour + " am";
  } else {
    hour = hour + " pm";
  }

  return hour;
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

export { convertToHour, convertToDay, getIcon };
