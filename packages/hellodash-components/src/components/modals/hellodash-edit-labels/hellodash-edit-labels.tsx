import { Modal } from '@didyoumeantoast/dash-components';
import { spaceConcat } from '@didyoumeantoast/dash-utils';
import { Label } from '@didyoumeantoast/hellodash-models';
import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';

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

  @Element() element: HTMLHellodashEditLabelsElement;

  //#endregion

  //#region @State

  @State() newLabelText?: string;
  @Watch('newLabelText')
  newLabelTextChanged() {
    this.updateCanAddLabel();
  }

  @State() canAddLabel: boolean;

  @State() areLabelsReordering: boolean;

  //#endregion

  //#region @Prop

  @Prop() labels: Label[] = [];

  @Prop({ reflect: true }) creatingLabel: boolean;

  //#endregion

  //#region @Event

  @Event({ eventName: 'dashModalBeforeClose' }) dashModalBeforeClose: EventEmitter;

  @Event({ eventName: 'dashModalClosed' }) dashModalClosed: EventEmitter;

  @Event({ eventName: 'hellodashEditLabelsDeleteLabel' }) deleteLabel: EventEmitter<Label>;

  @Event({ eventName: 'hellodashEditLabelsUpdateLabel' }) updateLabel: EventEmitter<Label>;

  @Event({ eventName: 'hellodashEditLabelsCreateLabel' }) createLabel: EventEmitter<Pick<Label, 'color' | 'text'>>;

  @Event({ eventName: 'hellodashEditLabelsLabelsReordered' }) labelsReordered: EventEmitter<Label[]>;

  //#endregion

  //#region Component lifecycle

  componentDidLoad() {
    (this.element.shadowRoot.querySelector('.new-label-input') as HTMLDashInputElement).setFocus();
  }

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

    const label = {
      color: '#af6566',
      text: this.newLabelText,
    };
    this.newLabelText = undefined;
    this.createLabel.emit(label);
  }

  /**
   * Called when the user has finished reordering the labels
   * @param event
   */
  itemsSorted(e: CustomEvent<HTMLDashListItemElement[]>) {
    // Get the new order of the labels
    const sortedLabels = e.detail.map(item => item.value as Label);
    this.labelsReordered.emit(sortedLabels);
  }

  //#endregion

  render() {
    return (
      <dash-modal ref={element => (this.modal = element)} heading='Edit labels' scale='s' autoFocus open>
        <form class='new-label-container'>
          <dash-input
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

        <dash-list
          class={spaceConcat('labels-container', this.areLabelsReordering && 'reordering')}
          selection-mode='no-selection'
          drag-enabled
          onDashListItemsReordered={this.itemsSorted.bind(this)}
          onDashListReorderStart={() => (this.areLabelsReordering = true)}
          onDashListReorderEnd={() => (this.areLabelsReordering = false)}
        >
          {this.labels.map(label => (
            <dash-list-item key={label.id} style={{ '--dash-list-item-background-color': 'var(--dash-background-2)' }} value={label}>
              <hellodash-label-edit
                style={{ flex: '1 1 auto' }}
                label={{ ...label }}
                onHellodashLabelEditLabelDeleted={e => this.deleteLabel.emit(e.detail)}
                onHellodashLabelEditLabelUpdated={e => this.updateLabel.emit(e.detail)}
              ></hellodash-label-edit>
            </dash-list-item>
          ))}
        </dash-list>
      </dash-modal>
    );
  }
}
