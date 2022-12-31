import { DateTime, DurationLike, Info, InfoUnitOptions, StringUnitLength } from 'luxon';

/**
 * Gets the start of the day for the given date
 * @param date Date object
 * @returns Start of day for given date
 */
export function startOfDay(date: Date) {
  return DateTime.fromJSDate(date).startOf('day').toJSDate();
}

/**
 * Gets the start of the week for the given date
 * @param date Date object
 * @returns Start of day for given date
 */
export function startOfWeek(date: Date) {
  const startDay = DateTime.fromJSDate(date).startOf('day');
  // want start of the week to be Sunday, luxon has it on Monday
  return startDay.weekday === 7 ? startDay.toJSDate() : startDay.startOf('week').minus({ days: 1 }).toJSDate();
}

/**
 * Gets the start of the month for the given date
 * @param date Date object
 * @returns Start of month for given date
 */
export function startOfMonth(date: Date) {
  return DateTime.fromJSDate(date).startOf('month').toJSDate();
}

/**
 * Gets the start of the minute for the given date
 * @param date Date object
 * @returns Start of day for given date
 */
export function startOfMinute(date: Date) {
  return DateTime.fromJSDate(date).startOf('minute').toJSDate();
}

/**
 * Gets the number of days in a given month
 * @param date Date object
 * @returns Number of days in the month
 */
export function daysInMonth(date: Date) {
  return DateTime.fromJSDate(date).daysInMonth;
}

/**
 * Adds time to given date
 * @param date Date object
 * @param timeParts Duration of time to add
 * @returns Date object with given date plus the duration
 */
export function addDuration(date: Date, duration: DurationLike) {
  return DateTime.fromJSDate(date).plus(duration).toJSDate();
}

/**
 * Subtracts time to given date
 * @param date Date object
 * @param timeParts Duration of time to subtract
 * @returns Date object with given date minus the duration
 */
export function minusDuration(date: Date, duration: DurationLike) {
  return DateTime.fromJSDate(date).minus(duration).toJSDate();
}

/**
 * Formats a date object to AM/PM (12 hour) format
 * @param date Date object
 * @returns Formatted AM/PM (12 hour) string
 */
export function formatDate(date: Date, format: string) {
  if (!date) {
    return;
  }

  return DateTime.fromJSDate(date).toFormat(format);
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
  if (!a || !b) {
    return false;
  }

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

/**
 * Check if date is valid
 * @param date date obj
 * @returns True if valid date
 */
export function dateIsValid(date: Date) {
  return date instanceof Date && !isNaN(date.getMilliseconds());
}

/**
 * Formats weekdays Sunday through Monday
 * @param length the length of the weekday representation, such as "narrow", "short", "long". Defaults to 'long'
 * @param options options
 * @param sundayStart if the start of the week is Sunday
 * @returns weekdays Sunday through Monday
 */
export function weekdays(length: StringUnitLength, options: InfoUnitOptions = {}, sundayStart = true) {
  const weekdays = Info.weekdays(length, options);
  if (sundayStart) {
    return [weekdays[weekdays.length - 1], ...weekdays.slice(0, weekdays.length - 1)];
  }

  return weekdays;
}

/**
 * Gets all dates in a month by weeks (as displayed in a calendar)
 * @param date date of month
 * @returns Date[][7]
 */
export function weeksInMonth(date: Date): Date[][] {
  const dateTime = DateTime.fromJSDate(date);
  const daysInMonth = dateTime.daysInMonth;
  const startOfMonth = dateTime.startOf('month');

  // map startDay from Mon - Sun to Sun - Sat
  let startDay = startOfMonth.weekday + 1;
  if (startDay === 8) {
    startDay = 1;
  }

  // calculate number of weeks
  const numWeeks = Math.ceil((daysInMonth + (startDay - 1)) / 7);
  // pre-populate array of weeks with null values
  const weeks: Date[][] = Array.from(Array(numWeeks), () => new Array(7).fill(null));
  // starting day always 1
  let currDate = startOfMonth.minus({ days: startDay - 1 });

  // generate 2d array of dates
  for (let i = 0; i < numWeeks * 7; i++) {
    const weekNum = Math.floor(i / 7);
    weeks[weekNum][i % 7] = currDate.toJSDate();
    currDate = currDate.plus({ days: 1 });
  }

  return weeks;
}
