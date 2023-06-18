import { html } from 'lit-html';
import { scaleControl } from '../../../../../.forge/common/controls';

const template = args => html` <div style="width: 100%;">
  <dash-select
    scale=${args.scale}
    name=${args.name}
    ?disabled=${args.disabled}
    ?required=${args.required}
    @dashSelectValueChange=${e => console.log(e.detail)}
  >
    <option value="" selected>--Please choose an option--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
  </dash-select>
</div>`;

export const selectDefinition = {
  name: '<dash-select>',
  controls: {
    scale: scaleControl,
    name: { type: 'text' },
    disabled: { type: 'boolean' },
    required: { type: 'boolean' },
  },
  template,
  args: {
    scale: 'm',
    name: 'dash-select',
    disabled: false,
    required: false,
  },
};

export default selectDefinition;
