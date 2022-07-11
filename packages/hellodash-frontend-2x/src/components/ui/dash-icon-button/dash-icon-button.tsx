import { Component, h, Method, Prop } from '@stencil/core';
import { Scale } from '../../../types/types';

@Component({
  tag: 'dash-icon-button',
  styleUrl: 'dash-icon-button.css',
  shadow: true,
})
export class DashIconButton {
  //#region Own properties
  button: HTMLButtonElement;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  icon: string;

  @Prop({
    reflect: true,
  })
  iconUrl: string;

  @Prop({
    reflect: true,
  })
  scale?: Scale;

  @Prop({
    reflect: true,
  })
  width?: number;

  @Prop({
    reflect: true,
  })
  loading: boolean;

  @Prop({
    reflect: true,
  })
  disabled: boolean;

  @Prop({
    reflect: true,
  })
  type: string;
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async setFocus() {
    this.button.focus();
  }
  //#endregion

  //#region Local methods
  click(e: Event) {
    if (this.loading || this.disabled) {
      e.stopPropagation();
    }
  }
  //#endregion

  render() {
    return (
      <button ref={element => (this.button = element)} disabled={this.loading || this.disabled} onClick={this.click.bind(this)} type={this.type ?? 'button'}>
        <dash-icon scale={this.scale} width={this.width} icon={this.icon} iconUrl={this.iconUrl} rounded />
        {this.loading && <dash-loader scale='s'></dash-loader>}
      </button>
    );
  }
}
