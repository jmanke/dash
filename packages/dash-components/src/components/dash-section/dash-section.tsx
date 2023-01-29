import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'dash-section',
  styleUrl: 'dash-section.css',
  shadow: true,
})
export class DashSection {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Section heading
   * @required
   */
  @Prop({
    reflect: true,
  })
  heading: string;

  /**
   * When true, header sticks to the top
   * @default false
   */
  @Prop({
    reflect: true,
  })
  stickyHeader: boolean;

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
      <Host>
        <header>
          <slot name='header'></slot>
        </header>

        <section>
          <slot></slot>
        </section>
      </Host>
    );
  }
}
