import { html } from 'lit-html';

const template = (args, updateArg) => {
  let dateParts = args.date.split('-');
  dateParts[1]--; // month in Date constructor is 0-indexed (e.g. '02' represents March);
  // @ts-ignore
  const dateObj = new Date(...dateParts); // parsed as local
  return html`<dash-date-picker
    .date=${dateObj}
    .format=${args.format}
    @dashDatePickerDateChange=${e => {
      const formatDate = (date: Date | string): string => {
        date = new Date(date);
        const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
        const month = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}`;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      };

      updateArg('date', formatDate(e.target.date));
    }}
  ></dash-date-picker>`;
};

export const datePickerDefinition = {
  name: '<dash-date-picker>',
  controls: {
    date: {
      type: 'date',
    },
    format: {
      type: 'json',
      description: 'Refresh iframe after modification',
    },
  },
  template,
  args: {
    date: '2022-12-15',
    format: {
      month: 'long',
      weekday: 'long',
      day: 'numeric',
    },
  },
};

export default datePickerDefinition;
