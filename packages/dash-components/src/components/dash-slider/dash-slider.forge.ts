import { html } from 'lit-html';

const template = (args, updateArg) =>
  html`<dash-slider
    style="flex: auto;"
    value=${args.value}
    min=${args.min}
    max=${args.max}
    step=${args.step}
    ?min-max-labels-visible=${args.minMaxLabels}
    ?value-label-visible=${args.valueLabel}
    @dashSliderValueChanged=${e => {
      updateArg('value', e.target.value);
    }}
  ></dash-slider>`;

export const sliderDefinition = {
  name: '<dash-slider>',
  controls: {
    value: { type: 'number' },
    min: { type: 'number' },
    max: { type: 'number' },
    step: { type: 'number' },
    minMaxLabels: { type: 'boolean' },
    valueLabel: { type: 'boolean' },
  },
  template,
  args: {
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    minMaxLabels: false,
    valueLabel: false,
  },
};

export default sliderDefinition;
