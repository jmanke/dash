import { html } from 'lit-html';

const template = args => html` <dash-grid style="width: 15rem; height: 15rem;" col-s=${args.colS} col-m=${args.colM} col-l=${args.colL} col-xl=${args.colXl}>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
  <div style="margin: 0.25rem; background-color: red; flex: auto; min-width: 1rem; min-height: 1rem"></div>
</dash-grid>`;

export const gridDefinition = {
  name: '<dash-grid>',
  controls: {
    colS: { type: 'number' },
    colM: { type: 'number' },
    colL: { type: 'number' },
    colXl: { type: 'number' },
  },
  template,
  args: {
    colS: 1,
    colM: 2,
    colL: 3,
    colXl: 4,
  },
};

export default gridDefinition;
