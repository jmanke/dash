import { Component, EventEmitter, Event, h, State, Prop, Watch, Element, Listen } from '@stencil/core';
import { isEmpty } from 'lodash';
import { updateLabel } from '../../../api/labels-api';
import { Label } from '../../../models/label';
import labelsState from '../../../stores/labels-store';
import { Color } from '@didyoumeantoast/dash-components/dist/types/types/types';
import { LabelViewModel } from '../../../view-models/label-view-model';

@Component({
  tag: 'dash-label-select',
  styleUrl: 'dash-label-select.css',
})
export class DashLabelEdit {
  //#region Own properties
  filterElement: HTMLDashFilterElement;

  colorSwatches = new Map<number, HTMLDashColorSwatchElement>();

  editingLabel: LabelViewModel;

  canCreateLabel = true;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashLabelSelectElement;
  //#endregion

  //#region @State
  @State()
  labelsMap: Map<number, LabelViewModel>;

  @State()
  filteredLabels: LabelViewModel[] = [];

  @State()
  filterValue: string;

  @State()
  drillMenuActive: boolean;
  @Watch('drillMenuActive')
  drillMenuActiveChanged(drillMenuActive) {
    if (!drillMenuActive) {
      setTimeout(() => {
        this.colorSwatches.get(this.editingLabel?.id)?.setFocus();
      }, 0);
    }
  }
  //#endregion

  //#region @Prop
  @Prop()
  labels: LabelViewModel[] = [];
  @Watch('labels')
  labelsChanged() {
    this.updateLabelsMap();
  }

  @Prop()
  autoFocus: boolean;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashLabelSelectLabelAdded',
  })
  dashPopupLabelEditLabelAdded: EventEmitter<LabelViewModel>;

  @Event({
    eventName: 'dashLabelSelectLabelRemoved',
  })
  dashPopupLabelEditLabelRemoved: EventEmitter<LabelViewModel>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.updateLabelsMap();
  }

  componentDidLoad() {
    (this.element.querySelector('dash-filter.filter') as HTMLDashFilterElement).setFocus();
  }
  //#endregion

  //#region Listeners
  @Listen('dashDrillMenuClosed')
  closeDrillMenu() {
    this.drillMenuActive = false;
  }
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  updateLabelsMap() {
    const map = new Map<number, LabelViewModel>();
    this.labels.forEach(l => map.set(l.id, l));
    this.labelsMap = map;
  }

  selectedLabelChanged(label: LabelViewModel, isSelected: Boolean) {
    if (isSelected) {
      this.dashPopupLabelEditLabelAdded.emit(label);
      return;
    }

    this.dashPopupLabelEditLabelRemoved.emit(label);
  }

  async createLabel(text: string) {
    if (!this.canCreateLabel) {
      return;
    }
    this.canCreateLabel = false;

    const createdLabel = { id: 0, text, color: 'red' } as Label;
    try {
      const label = await labelsState.addLabel(createdLabel);
      this.selectedLabelChanged(label, true);
      this.filterElement.clear();
      this.filterElement.select();
    } finally {
      this.canCreateLabel = true;
    }
  }

  labelColorChanged(label: LabelViewModel, color: Color) {
    label.color = color;
    updateLabel(label.__toModel());
  }

  editLabel(label: LabelViewModel) {
    this.editingLabel = label;
    this.drillMenuActive = true;
  }
  //#endregion

  render() {
    this.colorSwatches.clear();

    const listContent = this.filteredLabels?.length ? (
      <dash-list class='labels-list' selectionMode='multiple'>
        {this.filteredLabels?.map(label => (
          <dash-list-item selected={this.labelsMap?.has(label.id)} onDashListItemSelectedChanged={e => this.selectedLabelChanged(label, e.detail)}>
            <span class='label-text'>{label.text}</span>
            <dash-color-swatch
              ref={element => this.colorSwatches.set(label.id, element)}
              slot='actions-end'
              color={label.color}
              onClick={() => this.editLabel(label)}
            ></dash-color-swatch>
          </dash-list-item>
        ))}
      </dash-list>
    ) : (
      <div class='no-labels'>No labels</div>
    );

    const showAddLabel = !isEmpty(this.filterValue) && !labelsState.labels.find(l => l.text.trim() === this.filterValue);
    const addLabel = showAddLabel ? (
      <div class='add-label-message'>
        <dash-icon icon='plus' scale='m'></dash-icon>Press enter to add "{this.filterValue}"
      </div>
    ) : undefined;

    return (
      <dash-drill-menu class='container' active={this.drillMenuActive} drillHeading='Select a color'>
        {!!labelsState.labels.length && [
          <dash-filter
            class='filter'
            ref={element => (this.filterElement = element)}
            placeholder='Filter labels'
            items={labelsState.labels}
            objKey='text'
            onDashFilterSubmit={showAddLabel ? (e: CustomEvent<string>) => this.createLabel(e.detail) : undefined}
            onDashFilterFilteredItems={e => (this.filteredLabels = e.detail as LabelViewModel[])}
            onDashFilterValueChanged={e => (this.filterValue = e.detail)}
          ></dash-filter>,
          { addLabel },
          { listContent },

          <dash-label-color-picker
            slot='drill-content'
            color={this.editingLabel?.color}
            onDashLabelColorPickerColorChanged={(e: CustomEvent<Color>) => {
              this.labelColorChanged(this.editingLabel, e.detail);
              this.drillMenuActive = false;
            }}
          ></dash-label-color-picker>,
        ]}

        {!labelsState.labels.length && (
          <form>
            <dash-label>
              Add your first label
               
              <dash-input placeholder='Add label'></dash-input>
            </dash-label>
          </form>
        )}
      </dash-drill-menu>
    );
  }
}
