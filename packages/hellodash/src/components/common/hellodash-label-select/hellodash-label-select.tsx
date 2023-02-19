import { Component, EventEmitter, Event, h, State, Prop, Watch, Element, Listen } from '@stencil/core';
import { isEmpty } from 'lodash';
import { Label } from '../../../models/label';
import { Color } from '@didyoumeantoast/dash-components/dist/types/types/types';

@Component({
  tag: 'hellodash-label-select',
  styleUrl: 'hellodash-label-select.css',
})
export class HellodashLabelEdit {
  //#region Own properties
  filterElement: HTMLDashFilterElement;

  colorSwatches = new Map<number, HTMLDashColorSwatchElement>();

  editingLabel: Label;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLHellodashLabelSelectElement;
  //#endregion

  //#region @State
  @State()
  labelsMap: Map<number, Label>;

  @State()
  filteredLabelsIds: Set<number> = new Set();

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
  labels: Label[] = [];
  @Watch('labels')
  labelsChanged() {
    this.updateLabelsMap();
  }

  @Prop()
  allLabels: Label[] = [];

  @Prop({
    reflect: true,
  })
  canCreateLabel: boolean;

  @Prop()
  autoFocus: boolean;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'hellodashLabelSelectLabelAdded',
  })
  labelAdded: EventEmitter<Label>;

  @Event({
    eventName: 'hellodashLabelSelectLabelRemoved',
  })
  labelRemoved: EventEmitter<Label>;

  @Event({
    eventName: 'hellodashLabelSelectLabelCreated',
  })
  labelCreated: EventEmitter<Label>;

  @Event({
    eventName: 'hellodashLabelSelectLabelUpdated',
  })
  labelUpdated: EventEmitter<Label>;
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
    this.labelsMap = this.labels.reduce((map, label) => map.set(label.id, { ...label }), new Map<number, Label>());
  }

  selectedLabelChanged(label: Label, isSelected: Boolean) {
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

  labelColorChanged(label: Label, color: Color) {
    this.labelUpdated.emit({
      ...label,
      color,
    });
  }

  editLabel(label: Label) {
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
    const labels = this.filterValue?.length ? this.labels?.filter(label => this.filteredLabelsIds.has(label.id)) ?? [] : this.allLabels;

    const listContent = labels.length ? (
      <dash-list class='labels-list' selectionMode='multiple' maxItems={6}>
        {labels?.map(label => (
          <dash-list-item key={label.id} selected={this.labelsMap?.has(label.id)} onDashListItemSelectedChanged={e => this.selectedLabelChanged(label, e.target.selected)}>
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
          onDashFilterFilteredItems={e => (this.filteredLabelsIds = new Set((e.detail as Label[]).map(label => label.id)))}
          onDashFilterValueChanged={e => (this.filterValue = e.target.filterValue)}
        ></dash-filter>
        {addLabel}
        {listContent}
        <hellodash-label-color-picker
          slot='drill-content'
          color={this.editingLabel?.color}
          onHellodashLabelColorPickerColorChanged={(e: CustomEvent<Color>) => {
            this.labelColorChanged(this.editingLabel, e.detail);
            this.drillMenuActive = false;
          }}
        ></hellodash-label-color-picker>
      </dash-drill-menu>
    );
  }
}
