import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { Theme } from '../../types/types';

@Component({
  tag: 'dash-theme-toggle',
  styleUrl: 'dash-theme-toggle.css',
  shadow: true,
})
export class ThemeToggle {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Current theme
   * @required
   */
  @Prop({
    reflect: true,
    mutable: true,
  })
  theme: Theme = 'light';

  //#endregion

  //#region @Event

  /**
   * Emitted when the theme changed
   */
  @Event({
    eventName: 'dashThemeToggleChange',
  })
  themeToggleChange: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Toggles the theme
   */
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.themeToggleChange.emit();
  }

  //#endregion

  render() {
    return (
      <button class={`theme-${this.theme}`} title='Toggle light & dark' aria-label='auto' aria-live='polite' onClick={this.toggleTheme.bind(this)}>
        <svg class='sun-and-moon' aria-hidden='true' width='24' height='24' viewBox='0 0 24 24'>
          <circle class='sun' cx='12' cy='12' r='6' mask='url(#moon-mask)' fill='currentColor' />
          <g class='sun-beams' stroke='currentColor' stroke-linecap='round' stroke-width='2'>
            <line x1='12' y1='1' x2='12' y2='3' />
            <line x1='12' y1='21' x2='12' y2='23' />
            <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
            <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
            <line x1='1' y1='12' x2='3' y2='12' />
            <line x1='21' y1='12' x2='23' y2='12' />
            <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
            <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
          </g>

          <mask class='moon' id='moon-mask'>
            <rect x='0' y='0' width='100%' height='100%' fill='white' />
            <circle cx='24' cy='10' r='6' fill='black' />
          </mask>
        </svg>
      </button>
    );
  }
}
