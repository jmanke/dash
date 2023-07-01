import { html } from 'lit-html';

const template = args =>
  html` <dash-data-table
    columnWidth=${args.columnWidth}
    .json=${args.data}
    ?striped=${args.striped}
  ></dash-data-table>`;

export const dataTableDefinition = {
  name: '<dash-data-table>',
  controls: {
    columnWidth: { type: 'number' },
    striped: { type: 'boolean' },
    data: { type: 'json' },
  },
  template,
  args: {
    columnWidth: undefined,
    striped: false,
    data: [
      {
        Name: 'John',
        FavoriteFood: 'Mayo',
        Age: '30',
        City: 'New York',
      },
      {
        Name: 'Jane',
        Age: '25',
        City: 'Los Angeles',
      },
      {
        Name: 'Bob',
        Age: '35',
        City: 'Chicago',
      },
    ],
  },
};

export default dataTableDefinition;
