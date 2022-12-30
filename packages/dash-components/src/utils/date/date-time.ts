import { DateTime } from 'luxon';

export function startOfDay(date: Date) {
  return DateTime.fromJSDate(date).startOf('day').toJSDate();
}

export function addMinutes(date: Date, minutes: number) {
  return DateTime.fromJSDate(date).plus({ minutes }).toJSDate();
}

export function amPmFormat(date: Date) {
  return DateTime.fromJSDate(date).toFormat('h:mm a');
}

export function isValidAmPmTimeString(time: string) {
  // Regex to check valid
  // time in 12-hour format
  const regex = new RegExp(/^([0-1]\d):([0-5]\d)\s*(?:AM|PM)?$/i);

  if (time == null) {
    return false;
  }

  return regex.test(time);
}
