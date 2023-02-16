import { Component, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { Modal } from '@didyoumeantoast/dash-components/dist/types/interfaces/modal';
import { Label } from '../../../models/label';

@Component({
  tag: 'hellodash-edit-labels',
  styleUrl: 'hellodash-edit-labels.css',
  shadow: true,
})
export class HellodashEditLabels implements Modal {
  //#region Own properties
  modal: HTMLDashModalElement;
  addLabelButton: HTMLDashIconButtonElement;
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

  @Prop()
  labels: Label[];

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

  @Event({
    eventName: 'hellodashEditLabelsDeleteLabel',
  })
  deleteLabel: EventEmitter<Label>;

  @Event({
    eventName: 'hellodashEditLabelsUpdateLabel',
  })
  updateLabel: EventEmitter<Label>;

  @Event({
    eventName: 'hellodashEditLabelsCreateLabel',
  })
  createLabel: EventEmitter<Label>;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
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

    const label: Label = {
      id: -1,
      color: 'red',
      text: this.newLabelText,
    };
    this.newLabelText = undefined;
    this.createLabel.emit(label);
  }
  //#endregion

  render() {
    return (
      <dash-modal ref={element => (this.modal = element)} heading='Edit labels' scale='s' autoFocus open>
        <form class='new-label-container'>
          <dash-input
            ref={element => element.setFocus()}
            class='new-label-input'
            placeholder='Add label'
            scale='l'
            value={this.newLabelText}
            onDashInputInput={e => (this.newLabelText = e.target.value?.trim())}
            onDashInputSubmit={this.addLabel.bind(this)}
          ></dash-input>

          <dash-icon-button
            ref={element => {
              setTimeout(() => {
                this.addLabelButton = element;
              }, 0);
            }}
            icon='plus-lg'
            disabled={!this.canAddLabel}
            scale='l'
            loading={this.creatingLabel}
            onClick={this.addLabel.bind(this)}
          ></dash-icon-button>

          {this.canAddLabel && <dash-tooltip target={this.addLabelButton} text='Add label' placement='right' placementStrategy='fixed' offsetX={5}></dash-tooltip>}
        </form>

        <div class='labels-container'>
          {this.labels.map(label => (
            <hellodash-label-edit
              key={label.id}
              label={label}
              onHellodashLabelEditDeleteLabel={e => this.deleteLabel.emit(e.detail)}
              onHellodashLabelEditUpdateLabel={e => this.updateLabel.emit(e.detail)}
            ></hellodash-label-edit>
          ))}
        </div>
      </dash-modal>
    );
  }
}
