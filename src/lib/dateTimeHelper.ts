import { toDate, isValid, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

// format UTC date to timezone date
function formatDateToTimezone(date: string | undefined, dateFormat = "dd MMM yyyy") {
  if (!date) {
    return "";
  }
  if (date.startsWith("-")) {
    return "";
  }

  const parsedDate = toDate(date);
  if (!isValid(parsedDate)) {
    return date.toString();
  }

  // Get the current timezone from the browser
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(parsedDate, timeZone);
  const formattedDate = format(zonedDate, dateFormat);
  return formattedDate;
}

export { formatDateToTimezone };
