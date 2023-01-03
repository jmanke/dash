import { html } from 'lit-html';
import { scaleControl } from '../../../.forge/common/controls';

const template = (args, updateArg) =>
  html`<dash-modal
    ?open=${args.open}
    heading=${args.heading}
    scale=${args.scale}
    ?fullscreen=${args.fullscreen}
    ?hide-close-button=${args.hideCloseButton}
    ?auto-focus=${args.autoFocus}
    ?disable-fullscreen-mobile-view=${args.disableFullscreenMobileView}
    @dashModalClosed=${() => updateArg('open', false)}
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
        controls: ['open', 'heading', 'fullscreen', 'scale', 'hideCloseButton', 'autoFocus', 'disableFullscreenMobileView'],
      },
      methods: {
        label: 'Methods',
        controls: ['closeFn'],
      },
    },
  },
  controls: {
    open: {
      type: 'boolean',
    },
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
    open: true,
    heading: 'Test heading',
    fullscreen: false,
    scale: 'm',
    hideCloseButton: false,
    autoFocus: false,
    disableFullscreenMobileView: false,
  },
};

export default modalDefinition;
