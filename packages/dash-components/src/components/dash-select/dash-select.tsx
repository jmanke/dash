import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { Scale } from '../../types';

@Component({
  tag: 'dash-select',
  styleUrl: 'dash-select.css',
  scoped: true,
})
export class DashSelect {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Scale of select
   */
  @Prop({ reflect: true }) scale: Scale;

  /**
   * This attribute is used to specify the name of the control.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   */
  @Prop({ reflect: true }) name: string;

  /**
   * This Boolean attribute indicates that the user cannot interact with
   * the control.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   */
  @Prop({ reflect: true }) disabled?: boolean;

  /**
   * The <form> element to associate the <select> with (its form
   * owner). The value of this attribute must be the id of a <form> in
   * the same document. (If this attribute is not set, the <select> is
   * associated with its ancestor <form> element, if any.)
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   * @optional
   */
  @Prop() form?: string;

  /**
   * A Boolean attribute indicating that an option with a non-empty
   * string value must be selected.
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   */
  @Prop({ reflect: true }) required?: boolean;

  //#endregion

  //#region @Event

  @Event({ eventName: 'dashSelectValueChange' }) valueChanged: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  selectChanged(e) {
    console.log(e);
    console.log(e.target.value);
  }

  //#endregion

  render() {
    return (
      <Host>
        <div class='select-container'>
          <select
            name={this.name}
            disabled={this.disabled}
            form={this.form}
            required={this.required}
            onChange={this.selectChanged.bind(this)}
          >
            <slot />
          </select>

          <dash-icon icon='chevron-down' scale='s' />
        </div>
      </Host>
    );
  }
}
