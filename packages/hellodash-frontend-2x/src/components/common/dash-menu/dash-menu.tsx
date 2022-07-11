import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { appState } from '../../../stores/app-state';
import { focus } from '../../../utils/focus';
import { spaceConcat } from '../../../utils/space-concat';

@Component({
  tag: 'dash-menu',
  styleUrl: 'dash-menu.css',
})
export class DashMenu {
  //#region Own properties
  transitionTime: number;
  disableMenuTimeout?: NodeJS.Timeout;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashMenuElement;
  //#endregion

  //#region @State
  @State()
  disableMenu: boolean = true;
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  visible?: boolean;
  @Watch('visible')
  visibleChanged(visible?: boolean) {
    if (visible) {
      document.body.classList.add('global-scrim');
      if (this.disableMenuTimeout) {
        clearTimeout(this.disableMenuTimeout);
        this.disableMenuTimeout = null;
      }
      this.disableMenu = false;
      focus(this.element);
    } else {
      document.body.classList.remove('global-scrim');
      this.disableMenuTimeout = setTimeout(() => {
        this.disableMenu = true;
      }, this.transitionTime);
    }
  }

  @Prop({
    reflect: true,
  })
  heading?: string;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashMenuClose',
    composed: true,
  })
  dashMenuClose: EventEmitter;
  //#endregion

  //#region Component lifecycle
  componentDidLoad() {
    const style = getComputedStyle(this.element);
    this.transitionTime = parseInt(style.getPropertyValue('--dash-transition-time-fast'));
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  emitCloseMenu() {
    this.dashMenuClose.emit();
  }

  toggleTheme() {
    appState.settings.theme = appState.settings.theme === 'light' ? 'dark' : 'light';
  }
  //#endregion

  render() {
    return [
      <dash-scrim active={this.visible} onClick={this.emitCloseMenu.bind(this)} />,
      <dash-focus-trap class={this.disableMenu ? 'disable-menu' : ''}>
        <aside class={spaceConcat('dash-menu--sidebar', this.visible && 'visible')}>
          <header class='dash-menu--header'>
            <h2>{this.heading}</h2>
            <dash-icon-button icon='x' scale='s' onClick={this.emitCloseMenu.bind(this)} />
          </header>

          <dash-panel>
            <dash-label layout='inline'>
              Dark Theme
              <dash-toggle-switch onDashToggleSwitchCheckChanged={this.toggleTheme.bind(this)} checked={appState.settings.theme === 'dark'}></dash-toggle-switch>
            </dash-label>
            <slot></slot>
          </dash-panel>
        </aside>
      </dash-focus-trap>,
    ];
  }
}
