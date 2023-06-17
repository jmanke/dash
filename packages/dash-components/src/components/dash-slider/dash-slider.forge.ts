import { html } from 'lit-html';

const template = (args, updateArg) =>
  html` <dash-label style="flex: auto;">
    Slider (${args.value})
    <dash-slider
      style="flex: auto;"
      value=${args.value}
      min=${args.min}
      max=${args.max}
      step=${args.step}
      min-label-width=${args.minLabelWidth}
      max-label-width=${args.maxLabelWidth}
      ?min-max-labels-visible=${args.minMaxLabels}
      ?value-label-visible=${args.valueLabel}
      @dashSliderValueChanged=${e => {
        updateArg('value', e.target.value);
      }}
    ></dash-slider>
  </dash-label>`;

export const sliderDefinition = {
  name: '<dash-slider>',
  controls: {
    value: { type: 'number' },
    min: { type: 'number' },
    max: { type: 'number' },
    step: { type: 'number' },
    minLabelWidth: { type: 'number' },
    maxLabelWidth: { type: 'number' },
    minMaxLabels: { type: 'boolean' },
    valueLabel: { type: 'boolean' },
  },
  template,
  args: {
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    minLabelWidth: null,
    maxLabelWidth: null,
    minMaxLabels: true,
    valueLabel: false,
  },
};

export default sliderDefinition;
