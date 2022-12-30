import { html } from 'lit-html';
import { placementControl, placementStrategyControl } from '../../../.forge/common/controls';

const template = args => html` <dash-dropdown
  style="margin: 8rem; --dash-dropdown-max-height: var(--dash-spacing-24); --dash-dropdown-padding: var(--dash-spacing-3);"
  placement=${args.placement}
  placement-strategy=${args.placementStrategy}
  ?auto-close=${args.autoClose}
>
  <dash-button slot="dropdown-trigger">Open me</dash-button>

  <div>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
    <div>Item 5</div>
    <div>Item 6</div>
    <div>Item 7</div>
    <div>Item 8</div>
    <div>Item 9</div>
    <div>Item 10</div>
  </div>
</dash-dropdown>`;

export const dropdownDefinition = {
  name: '<dash-dropdown>',
  controls: {
    placement: placementControl,
    placementStrategy: placementStrategyControl,
    autoClose: { type: 'boolean' },
  },
  template,
  args: {
    placement: 'bottom-end',
    placementStrategy: 'absolute',
    autoClose: true,
  },
};

export default dropdownDefinition;
