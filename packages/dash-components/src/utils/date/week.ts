import { DateTime, Info, InfoUnitOptions, StringUnitLength } from 'luxon';

/**
 * Finds the start of the week (Sunday) with the given date
 * @param date date to find start of week with
 * @param sundayStart if the start of the week is Sunday
 * @returns start of the week on Sunday
 */
export function startOfWeekSunday(date: DateTime, sundayStart = true) {
  const startDay = date.startOf('week');

  if (sundayStart) {
    return startDay.minus({ days: 1 });
  }

  return startDay;
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
