import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dash-nav-link',
  styleUrl: 'dash-nav-link.css',
  shadow: true,
})
export class DashNavLink {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  href: string;
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
    return (
      <a href={this.href}>
        <slot />
      </a>
    );
  }
}
