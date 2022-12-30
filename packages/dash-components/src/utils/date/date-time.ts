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

export function toLocaleString(date: Date, opts?: Intl.DateTimeFormatOptions) {
  if (!date) {
    return;
  }

  return DateTime.fromJSDate(date).toLocaleString(opts);
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

export function nextMonth(date: Date) {
  return DateTime.fromJSDate(date).plus({ months: 1 }).toJSDate();
}

export function prevMonth(date: Date) {
  return DateTime.fromJSDate(date).minus({ months: 1 }).toJSDate();
}

export function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
