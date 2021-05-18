import { fromUnixTime, getHours } from "date-fns";
import weatherIcons from "./weatherIcons";

function convertToHour(unix) {
  const date = fromUnixTime(unix);
  const hour = getHours(date);
  return hour;
}

function convertToDay(unix) {
  const date = fromUnixTime(unix);
  const day = date.toString().substring(0, 3);
  return day;
}

function getIcon(data) {
  const prefix = "wi-";
  const code = data.id;
  let icon = weatherIcons[code].icon;

  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = "day-" + icon;
  }

  icon = prefix + icon;
  return icon;
}

export { convertToHour, convertToDay, getIcon };
