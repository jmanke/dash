import { DateTime, Info, InfoUnitOptions, StringUnitLength } from 'luxon';

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
