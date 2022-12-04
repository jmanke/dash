import { createStore } from '@stencil/store';
import { without } from 'lodash';
import { createLabel, fetchLabel, fetchLabels, removeLabel, updateLabel } from '../api/labels-api';
import { EventEmitter } from '@didyoumeantoast/dash-utils';
import { Label } from '../models/label';
import { replaceAt } from '@didyoumeantoast/dash-utils';
import { LabelViewModel } from '../view-models/label-view-model';

interface ILabelsState {
  labels?: LabelViewModel[];
}

// create a wrapper class around the state and add get, replace, delete, add methods
class LabelsState {
  private eventEmitter: EventEmitter = new EventEmitter();
  private state: ILabelsState;
  private labelsMap: Map<number, LabelViewModel> = new Map();

  constructor() {
    const { state, onChange } = createStore<ILabelsState>({
      labels: undefined,
    });
    this.state = state;
    onChange('labels', labels => {
      const prevLabels = this.labelsMap.values();
      this.labelsMap.clear();
      labels?.forEach(label => {
        this.labelsMap.set(label.id, label);
      });
      this.eventEmitter.emit('labelsChanged', this.labels, prevLabels);
    });
  }

  addLabelsChangedListener(callbackFn: (labels: LabelViewModel[], prevLabels: LabelViewModel[]) => any) {
    this.eventEmitter.on('labelsChanged', callbackFn);
  }

  removeLabelsChangedListener(callbackFn: (labels: LabelViewModel[], prevLabels: LabelViewModel[]) => any) {
    this.eventEmitter.removeListener('labelsChanged', callbackFn);
  }

  async init() {
    const labels = (await fetchLabels()) ?? [];
    this.state.labels = labels.map(label => new LabelViewModel(label));
  }

  get labels() {
    return this.state.labels ?? [];
  }

  getLabelsByIds(ids: number[]) {
    if (!ids || !ids.length) {
      return [];
    }

    return ids.map(id => this.labelsMap.get(id)).filter(label => !!label);
  }

  async updateLabel(label: LabelViewModel) {
    if (!this.state.labels) {
      return;
    }

    // replace the label with the same id
    this.state.labels = replaceAt(this.state.labels, n => n.id === label.id, label);
    // sync with server
    // TODO: if update fails, revert back to previous label
    const resp = await updateLabel(label.__toModel());
    label.__isDirty = false;
    return resp;
  }

  async deleteLabel(label: LabelViewModel) {
    this.state.labels = without(this.state.labels, label);
    // sync with server
    // TODO: if update fails, revert back to previous state
    return removeLabel(label.__toModel());
  }

  async addLabel(label: Label) {
    const createdLabelId = await createLabel(label);
    const createdLabel = await fetchLabel(createdLabelId);
    const newLabel = new LabelViewModel(createdLabel);
    // sync with server
    // TODO: if update fails, revert back to previous state
    this.state.labels = [...this.state.labels, newLabel];
    return newLabel;
  }

  async saveAll() {
    const dirtyLabels = this.labels.filter(label => label.__isDirty).map(label => this.updateLabel(label));

    return Promise.all(dirtyLabels);
  }
}

const labelsState = new LabelsState();

export default labelsState;
