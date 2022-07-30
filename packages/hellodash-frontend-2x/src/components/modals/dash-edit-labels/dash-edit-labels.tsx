import { Component, Event, EventEmitter, h, Listen, Method, State, Watch } from '@stencil/core';
import { Modal } from '@didyoumeantoast/dash-components/dist/types/interfaces/modal';
import { Label } from '../../../models/label';
import labelsState from '../../../stores/labels-store';
import { LabelViewModel } from '../../../view-models/label-view-model';
import { dashRootService } from '../../dash-root/dash-root-service';

@Component({
  tag: 'dash-edit-labels',
  styleUrl: 'dash-edit-labels.css',
  shadow: true,
})
export class DashEditLabels implements Modal {
  //#region Own properties
  modal: HTMLDashModalElement;

  closeModalCb: () => void;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  newLabelText?: string;
  @Watch('newLabelText')
  newLabelTextChanged() {
    this.updateCanAddLabel();
  }

  @State()
  creatingLabel: boolean;

  @State()
  canAddLabel: boolean;
  //#endregion

  //#region @Prop
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashModalBeforeClose',
  })
  dashModalBeforeClose: EventEmitter;

  @Event({
    eventName: 'dashModalClosed',
  })
  dashModalClosed: EventEmitter;
  //#endregion

  //#region Component lifecycle
  connectedCallback() {
    this.closeModalCb = () => this.modal.close();
    dashRootService.addHistoryChangedListener(this.closeModalCb);
  }

  disconnectedCallback() {
    dashRootService.removeHistoryChangedListener(this.closeModalCb);
    this.closeModalCb = null;
  }
  //#endregion

  //#region Listeners
  @Listen('dashModalBeforeClose')
  async beforeModalClose() {
    await labelsState.saveAll();
  }

  @Listen('dashDeleteLabel')
  async deleteLabel(e: CustomEvent<LabelViewModel>) {
    await labelsState.deleteLabel(e.detail);
  }
  //#endregion

  //#region @Method
  @Method()
  async close() {
    return this.modal.close();
  }
  //#endregion

  //#region Local methods
  updateCanAddLabel() {
    this.canAddLabel = !!this.newLabelText && !!this.newLabelText.length;
  }

  async addLabel() {
    if (this.creatingLabel || !this.canAddLabel) {
      return;
    }

    const label = new Label();
    label.color = 'red';
    label.text = this.newLabelText;
    this.newLabelText = undefined;
    this.creatingLabel = true;

    try {
      await labelsState.addLabel(label);
    } finally {
      // TODO: handle error case
      this.creatingLabel = false;
    }
  }
  //#endregion

  render() {
    return (
      <dash-modal ref={element => (this.modal = element)} heading='Edit labels' scale='s' autoFocus>
        <form class='new-label-container'>
          <dash-input
            ref={element => element.setFocus()}
            class='new-label-input'
            placeholder='Add label'
            scale='l'
            value={this.newLabelText}
            onDashInputInput={e => (this.newLabelText = e.detail)}
            onDashInputSubmit={this.addLabel.bind(this)}
          ></dash-input>

          <dash-icon-button icon='plus-lg' disabled={!this.canAddLabel} scale='l' loading={this.creatingLabel} onClick={this.addLabel.bind(this)}></dash-icon-button>
        </form>

        <div class='labels-container'>
          {labelsState.labels.map(label => (
            <dash-label-edit key={label.id} label={label}></dash-label-edit>
          ))}
        </div>
      </dash-modal>
    );
  }
}
