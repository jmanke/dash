import { Component, h, Host, Prop, State } from '@stencil/core';
import { isHex } from '@didyoumeantoast/dash-utils';

@Component({
  tag: 'dash-sidebar-button',
  styleUrl: 'dash-sidebar-button.css',
  shadow: true,
})
export class DashSidebarButton {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State

  @State()
  button: HTMLElement;

  //#endregion

  //#region @Prop

  /**
   * Icon displayed at the start of the button
   * @required
   */
  @Prop({
    reflect: true,
  })
  icon: string;

  /**
   * When `true`, the button is in collapsed mode
   * @default false
   */
  @Prop({
    reflect: true,
  })
  collapsed: boolean;

  /**
   * Button text to display
   * @required
   */
  @Prop({
    reflect: true,
  })
  text: string;

  /**
   * Sets the color of the icon
   * @optional
   */
  @Prop({
    reflect: true,
  })
  iconColor: string;

  /**
   * When `true`, the button is visibly active
   * @default false
   */
  @Prop({
    reflect: true,
  })
  active: boolean;

  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  //#endregion

  render() {
    const style = { '--dash-sidebar-button-icon-color': `${isHex(this.iconColor) ? this.iconColor : `var(--dash-color-${this.iconColor})`}` };

    return (
      <Host>
        <button
          style={style}
          ref={element =>
            setTimeout(() => {
              this.button = element;
            }, 0)
          }
        >
          <dash-icon icon={this.icon}></dash-icon>
          <span class='text'>{this.text}</span>
        </button>
        {this.collapsed && <dash-tooltip target={this.button} text={this.text} placementStrategy='fixed' placement='right' offsetX={12} arrow></dash-tooltip>}
      </Host>
    );
  }
}
