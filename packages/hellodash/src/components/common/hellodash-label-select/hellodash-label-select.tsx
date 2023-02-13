import { Component, EventEmitter, Event, h, State, Prop, Watch, Element, Listen } from '@stencil/core';
import { isEmpty } from 'lodash';
import { Label } from '../../../models/label';
import { Color } from '@didyoumeantoast/dash-components/dist/types/types/types';
import { LabelViewModel } from '../../../view-models/label-view-model';

@Component({
  tag: 'hellodash-label-select',
  styleUrl: 'hellodash-label-select.css',
})
export class HellodashLabelEdit {
  //#region Own properties
  filterElement: HTMLDashFilterElement;

  colorSwatches = new Map<number, HTMLDashColorSwatchElement>();

  editingLabel: LabelViewModel;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLHellodashLabelSelectElement;
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
      }, 50);
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
  allLabels: LabelViewModel[] = [];

  @Prop({
    reflect: true,
  })
  canCreateLabel: boolean;

  @Prop()
  autoFocus: boolean;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashLabelSelectLabelAdded',
  })
  labelAdded: EventEmitter<LabelViewModel>;

  @Event({
    eventName: 'dashLabelSelectLabelRemoved',
  })
  labelRemoved: EventEmitter<LabelViewModel>;

  @Event({
    eventName: 'dashLabelSelectLabelCreated',
  })
  labelCreated: EventEmitter<Label>;

  @Event({
    eventName: 'dashLabelSelectLabelUpdated',
  })
  labelUpdated: EventEmitter<LabelViewModel>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.updateLabelsMap();
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
      this.labelAdded.emit(label);
      return;
    }

    this.labelRemoved.emit(label);
  }

  async createLabel() {
    if (!this.canCreateLabel) {
      return;
    }

    const createdLabel = { id: -1, text: this.filterValue, color: 'red' } as Label;
    this.labelCreated.emit(createdLabel);
    this.filterElement?.clear();
    this.filterElement?.select();
  }

  labelColorChanged(label: LabelViewModel, color: Color) {
    label.color = color;
    this.labelUpdated.emit(label);
  }

  editLabel(label: LabelViewModel) {
    this.editingLabel = label;
    this.drillMenuActive = true;
  }

  async filterElementAdded(element: HTMLDashFilterElement) {
    if (this.filterElement) {
      return;
    }

    this.filterElement = element;
    if (!element) {
      return;
    }

    await element.componentOnReady();
    element.setFocus();
  }
  //#endregion

  render() {
    this.colorSwatches.clear();

    const listContent = this.filteredLabels?.length ? (
      <dash-list class='labels-list' selectionMode='multiple' maxItems={6}>
        {this.filteredLabels?.map(label => (
          <dash-list-item selected={this.labelsMap?.has(label.id)} onDashListItemSelectedChanged={e => this.selectedLabelChanged(label, e.target.selected)}>
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

    const showAddLabel = this.canCreateLabel && !isEmpty(this.filterValue) && !this.allLabels.find(l => l.text.trim() === this.filterValue);
    const addLabel = showAddLabel ? (
      <dash-button startIcon='plus' onClick={this.createLabel.bind(this)}>
        Add "{this.filterValue}"
      </dash-button>
    ) : undefined;

    return (
      <dash-drill-menu class='container' active={this.drillMenuActive} drillHeading='Select a color'>
        <dash-filter
          class='filter'
          ref={this.filterElementAdded.bind(this)}
          placeholder='Filter labels'
          items={this.allLabels}
          objKey='text'
          onDashFilterFilteredItems={e => (this.filteredLabels = e.detail as LabelViewModel[])}
          onDashFilterValueChanged={e => (this.filterValue = e.target.filterValue)}
        ></dash-filter>
        {addLabel}
        {listContent}
        <hellodash-label-color-picker
          slot='drill-content'
          color={this.editingLabel?.color}
          onDashLabelColorPickerColorChanged={(e: CustomEvent<Color>) => {
            this.labelColorChanged(this.editingLabel, e.detail);
            this.drillMenuActive = false;
          }}
        ></hellodash-label-color-picker>
      </dash-drill-menu>
    );
  }
}
