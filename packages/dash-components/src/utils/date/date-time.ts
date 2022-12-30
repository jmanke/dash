import { DateTime } from 'luxon';

/**
 * Gets the start of the day for the given date
 * @param date Date object
 * @returns Start of day for given date
 */
export function startOfDay(date: Date) {
  return DateTime.fromJSDate(date).startOf('day').toJSDate();
}

/**
 * Adds minutes to given date
 * @param date Date object
 * @param minutes Number of minutes to add
 * @returns Date object with given date plus number of minutes
 */
export function addMinutes(date: Date, minutes: number) {
  return DateTime.fromJSDate(date).plus({ minutes }).toJSDate();
}

/**
 * Formats a date object to AM/PM (12 hour) format
 * @param date Date object
 * @returns Formatted AM/PM (12 hour) string
 */
export function amPmFormat(date: Date) {
  return DateTime.fromJSDate(date).toFormat('h:mm a');
}

/**
 * Formats given date to locale string
 * @param date Date object
 * @param opts Formatting options
 * @returns Locale string for given date
 */
export function toLocaleString(date: Date, opts?: Intl.DateTimeFormatOptions) {
  if (!date) {
    return '';
  }

  return DateTime.fromJSDate(date).toLocaleString(opts);
}

/**
 * Checks if given time string is in a valid 12 hour time format (12 hour format, ex. "12:36 AM")
 * @param time time string
 * @returns True if the string is a valid 12 hour formatted string
 */
export function isValid12HourFormat(time: string) {
  if (!time) {
    return false;
  }

  // Regex to check valid
  // time in 12-hour format
  const pattern = /^(\d{0,2}):(\d{2})\s*(AM|PM)$/i;
  const match = time.match(pattern);

  if (!match) {
    return false;
  }

  const hour = Number.parseInt(match[1]);
  const minute = Number.parseInt(match[2]);

  return hour > 0 && hour <= 12 && minute >= 0 && minute < 60;
}

/**
 * Adds one month to the given date
 * @param date Date object
 * @returns Next month date object
 */
export function nextMonth(date: Date) {
  return DateTime.fromJSDate(date).plus({ months: 1 }).toJSDate();
}

/**
 * Minus one month to the given date
 * @param date Date object
 * @returns Previous month date object
 */
export function prevMonth(date: Date) {
  return DateTime.fromJSDate(date).minus({ months: 1 }).toJSDate();
}

/**
 *
 * @param a first date object
 * @param b second date object
 * @returns True if both dates are on the same day
 */
export function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
