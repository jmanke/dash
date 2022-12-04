import { html } from 'lit-html';
import { scaleControl } from '../../../.forge/common/controls';

const template = args =>
  html`<dash-modal
    heading=${args.heading}
    scale=${args.scale}
    ?fullscreen=${args.fullscreen}
    ?hide-close-button=${args.hideCloseButton}
    ?auto-focus=${args.autoFocus}
    ?disable-fullscreen-mobile-view=${args.disableFullscreenMobileView}
  >
    This is some modal content

    <div slot="footer-start">
      <dash-button> Confirm </dash-button>
      <dash-button> Cancel </dash-button>
    </div>
  </dash-modal>`;

export const modalDefinition = {
  name: '<dash-modal>',
  tabs: {
    options: {
      properties: {
        label: 'Properties',
        controls: ['heading', 'fullscreen', 'scale', 'hideCloseButton', 'autoFocus', 'disableFullscreenMobileView'],
      },
      methods: {
        label: 'Methods',
        controls: ['closeFn'],
      },
    },
  },
  controls: {
    heading: { type: 'text' },
    fullscreen: { type: 'boolean' },
    scale: scaleControl,
    hideCloseButton: { type: 'boolean' },
    autoFocus: { type: 'boolean' },
    disableFullscreenMobileView: { type: 'boolean' },
    closeFn: {
      type: 'function',
      fn: (root: HTMLElement) => {
        const modal = root.querySelector('dash-modal');
        // @ts-ignore
        modal.close();
      },
      label: 'Close modal',
    },
  },
  template,
  args: {
    heading: 'Test heading',
    fullscreen: false,
    scale: 'm',
    hideCloseButton: false,
    autoFocus: false,
    disableFullscreenMobileView: false,
  },
};

export default modalDefinition;
