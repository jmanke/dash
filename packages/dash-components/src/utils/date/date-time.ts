import { DateTime, DurationLike } from 'luxon';

/**
 * Gets the start of the day for the given date
 * @param date Date object
 * @returns Start of day for given date
 */
export function startOfDay(date: Date) {
  return DateTime.fromJSDate(date).startOf('day').toJSDate();
}

/**
 * Adds time to given date
 * @param date Date object
 * @param timeParts Duration of time to add
 * @returns Date object with given date plus number of minutes
 */
export function addDuration(date: Date, duration: DurationLike) {
  return DateTime.fromJSDate(date).plus(duration).toJSDate();
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
 * Gets parts of a time string (12 hour format, ex. "12:36 AM")
 * @param time time string
 * @returns Time parts of given time string (hour, minutes)
 */
export function timeParts(time: string) {
  if (!time) {
    return {
      valid: false,
    };
  }

  // Regex to check valid
  // time in 12-hour format
  const pattern = /^(\d{0,2}):(\d{2})\s*(AM|PM)$/i;
  const match = time.match(pattern);

  if (!match) {
    return {
      valid: false,
    };
  }

  let hour = Number.parseInt(match[1]);
  const minute = Number.parseInt(match[2]);
  const amPm = match[3].toUpperCase();
  const valid = hour > 0 && hour <= 12 && minute >= 0 && minute < 60;

  if (hour === 12) {
    hour = 0;
  }
  if (amPm === 'PM') {
    hour += 12;
  }

  const parts = valid
    ? {
        hour,
        minute,
      }
    : undefined;

  return {
    valid,
    parts,
  };
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

/**
 * Sets time from isoTime to isoDate
 * @param isoDate date ISO8601 date string
 * @param isoTime time ISO8601 time string
 */
export function setTimeISO8601(isoDate: string, isoTime: string) {
  const iso8601Pattern = /^(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}:\d{2}.\d{3}.*)$/;
  const datePart = isoDate.match(iso8601Pattern)?.[1];
  const timePart = isoTime.match(iso8601Pattern)?.[2];

  if (!datePart || !timePart) {
    return isoDate;
  }

  return datePart + timePart;
}
