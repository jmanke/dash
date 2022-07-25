import { Component, Host, h, Prop, Listen, Event, EventEmitter } from '@stencil/core';
import { Color } from 'didyoumeantoast-dash-components/dist/types/types/types';
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
      <Host>
        <div class='container'>
          <dash-inline-edit value={this.label.text}></dash-inline-edit>
          <dash-dropdown
            ref={element => (this.labelColorPickerDropdown = element)}
            placement='bottom-end'
            placementStrategy='fixed'
            onDropdownVisibleChanged={e => this.dropdownVisibleChanged(e)}
            autoClose
          >
            <dash-color-swatch slot='dropdown-trigger' color={this.label.color}></dash-color-swatch>

            <dash-label-color-picker color={this.label.color}></dash-label-color-picker>
          </dash-dropdown>

          <dash-dropdown class='delete-dropdown' placement='bottom-end' placementStrategy='fixed' onDropdownVisibleChanged={e => this.dropdownVisibleChanged(e)} autoClose>
            <dash-icon-button class='delete-button' slot='dropdown-trigger' icon='trash3'></dash-icon-button>

            <dash-button ref={element => (this.confirmDeleteButton = element)} class='delete-confirm' status='error' onClick={() => this.dashDeleteLabel.emit(this.label)}>
              Delete
            </dash-button>
          </dash-dropdown>
        </div>
      </Host>
    );
  }
}
