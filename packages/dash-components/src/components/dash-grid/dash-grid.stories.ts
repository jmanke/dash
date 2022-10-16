export default {
  title: 'Components/Dash Grid',
};

const Template = args => `
  <dash-grid
    style="width: 15rem; height: 15rem;"
    col-s=${args.colS}
    col-m=${args.colM}
    col-l=${args.colL}
    col-xl=${args.colXl}
  >
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
  </dash-grid>
  `;

export const DefaultGrid = Template.bind({});
DefaultGrid.args = {
  colS: 1,
  colM: 2,
  colL: 3,
  colXl: 4,
};
