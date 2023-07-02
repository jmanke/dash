import { html } from 'lit-html';

const template = args =>
  html` <dash-data-table
    style="width: 100%; max-height: 250px;"
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
        Namey: 'John',
        FavoriteFoody: 'Mayo',
        Agey: '30',
        Cityy: 'New York',
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
      {
        Name: 'Jeff',
        Age: '35',
        City: 'Chicago',
      },
      {
        Name: 'Ross',
        Age: '35',
        City: 'Chicago',
      },
    ],
  },
};

export default dataTableDefinition;
