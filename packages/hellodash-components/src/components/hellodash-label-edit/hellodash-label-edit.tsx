import { DashDropdownCustomEvent, DashInlineEditCustomEvent } from '@didyoumeantoast/dash-components';
import { Label } from '@didyoumeantoast/hellodash-models';
import { Component, Event, EventEmitter, h, Listen, Prop, State } from '@stencil/core';

@Component({
  tag: 'hellodash-label-edit',
  styleUrl: 'hellodash-label-edit.css',
  shadow: true,
})
export class HellodashLabelEdit {
  //#region Own properties

  confirmDeleteButton: HTMLDashButtonElement;
  labelColorPickerDropdown: HTMLDashDropdownElement;

  //#endregion

  //#region @Element
  //#endregion

  //#region @State

  @State() dropdownOpen: boolean;

  //#endregion

  //#region @Prop

  @Prop() label: Label;

  //#endregion

  //#region @Event

  @Event({ eventName: 'hellodashLabelEditLabelDeleted' }) labelDeleted: EventEmitter<Label>;

  @Event({ eventName: 'hellodashLabelEditLabelUpdated' }) labelUpdated: EventEmitter<Label>;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners

  /**
   * Handles color picker color changed event
   * @param e Color picker color changed event
   */
  @Listen('hellodashLabelColorPickerColorChanged')
  colorPicked(e: CustomEvent<string>) {
    this.labelUpdated.emit({
      ...this.label,
      color: e.detail,
    });
    this.labelColorPickerDropdown.close();
  }

  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Handles dropdown visible changed event
   * @param e Dropdown visible changed event
   */
  dropdownVisibleChanged(e: DashDropdownCustomEvent<void>) {
    if (e.target.open) {
      this.confirmDeleteButton?.setFocus();
    }

    this.dropdownOpen = e.target.open;
  }

  /**
   * Handles label text changed event
   * @param e Label text changed event
   */
  updateLabelText(e: DashInlineEditCustomEvent<void>) {
    const value = e.target.value;
    if (!value || !value.length) {
      e.target.value = this.label.text;
      return;
    }
    this.label.text = e.target.value;
    this.labelUpdated.emit(this.label);
  }

  //#endregion

  render() {
    return (
      <div class='container'>
        <dash-dropdown
          ref={element => (this.labelColorPickerDropdown = element)}
          placement='bottom'
          open={this.dropdownOpen}
          placementStrategy='fixed'
          onDashDropdownOpenChange={this.dropdownVisibleChanged.bind(this)}
          autoClose
        >
          <dash-color-swatch slot='dropdown-trigger' color={this.label.color}></dash-color-swatch>

          {this.dropdownOpen && <hellodash-label-color-picker color={this.label.color}></hellodash-label-color-picker>}
        </dash-dropdown>
        <dash-inline-edit value={this.label.text} onDashInlineEditValueChanged={this.updateLabelText.bind(this)}></dash-inline-edit>

        <dash-confirm-button icon='trash3' onDashConfirmButtonConfirmed={() => this.labelDeleted.emit(this.label)}></dash-confirm-button>
      </div>
    );
  }
}
