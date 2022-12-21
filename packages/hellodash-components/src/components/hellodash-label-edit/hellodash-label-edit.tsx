import { Component, h, Prop, Listen, Event, EventEmitter } from '@stencil/core';
import { Color } from '@didyoumeantoast/dash-components/dist/types/types/types';
import { Label } from '../../interfaces/label';

@Component({
  tag: 'hellodash-label-edit',
  styleUrl: 'hellodash-label-edit.css',
  shadow: true,
})
export class DashLabelEdit {
  //#region Own properties
  confirmDeleteButton: HTMLDashButtonElement;
  labelColorPickerDropdown: HTMLDashDropdownElement;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop()
  label: Label;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'hellodashDeleteLabel',
  })
  deleteLabel: EventEmitter;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  @Listen('hellodashLabelColorPickerColorChanged')
  colorPicked(e: CustomEvent<Color>) {
    this.label.color = e.detail;
    this.labelColorPickerDropdown.close();
  }

  @Listen('hellodashInlineEditValueChanged')
  labelTextChanged(e: CustomEvent<string>) {
    this.label.text = e.detail;
  }
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  dropdownVisibleChanged(e: CustomEvent<boolean>) {
    if (e.detail) {
      this.confirmDeleteButton?.setFocus();
    }
  }
  //#endregion

  render() {
    return (
      <div class='container'>
        <dash-dropdown
          ref={element => (this.labelColorPickerDropdown = element)}
          placement='bottom'
          placementStrategy='fixed'
          onDropdownVisibleChanged={e => this.dropdownVisibleChanged(e)}
          autoClose
        >
          <dash-color-swatch slot='dropdown-trigger' color={this.label.color}></dash-color-swatch>

          <dash-label-color-picker color={this.label.color}></dash-label-color-picker>
        </dash-dropdown>
        <dash-inline-edit value={this.label.text}></dash-inline-edit>

        <dash-confirm-button icon='trash3' onDashConfirmButtonConfirmed={() => this.deleteLabel.emit()}></dash-confirm-button>
      </div>
    );
  }
}
