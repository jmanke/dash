import { Component, h, Prop, Listen, Event, EventEmitter } from '@stencil/core';
import { Color } from '@didyoumeantoast/dash-components/dist/types/types/types';
import { LabelViewModel } from '../../../view-models/label-view-model';

@Component({
  tag: 'dash-label-edit',
  styleUrl: 'dash-label-edit.css',
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
  label: LabelViewModel;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashDeleteLabel',
  })
  dashDeleteLabel: EventEmitter<LabelViewModel>;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  @Listen('dashLabelColorPickerColorChanged')
  colorPicked(e: CustomEvent<Color>) {
    this.label.color = e.detail;
    this.labelColorPickerDropdown.close();
  }

  @Listen('dashInlineEditValueChanged')
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
          <div class='dropdown-container'>
            <dash-color-swatch slot='dropdown-trigger' color={this.label.color}></dash-color-swatch>

            <dash-label-color-picker color={this.label.color}></dash-label-color-picker>
          </div>
        </dash-dropdown>
        <dash-inline-edit value={this.label.text}></dash-inline-edit>

        <dash-confirm-button icon='trash3' onDashConfirmButtonConfirmed={() => this.dashDeleteLabel.emit(this.label)}></dash-confirm-button>
      </div>
    );
  }
}
