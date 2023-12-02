import { html } from 'lit-html';

const template = () => html`<dash-carousel style="width: 20rem;">
  <dash-carousel-item>
    <img src="https://via.placeholder.com/150" />
  </dash-carousel-item>
  <dash-carousel-item visible>
    <img src="https://placekitten.com/150/150" />
  </dash-carousel-item>
  <dash-carousel-item>
    <img src="https://placekitten.com/200/150" />
  </dash-carousel-item>
</dash-carousel>`;

export const carouselDefinition = {
  name: '<dash-carousel>',
  controls: {},
  template,
  args: {},
};

export default carouselDefinition;
