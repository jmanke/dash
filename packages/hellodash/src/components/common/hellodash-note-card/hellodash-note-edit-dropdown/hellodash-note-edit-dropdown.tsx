import { DashDropdownCustomEvent } from '@didyoumeantoast/dash-components/dist/types/components';
import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { LabelViewModel } from '../../../../view-models/label-view-model';
import { Label } from '../../../../models/label';
import labelsState from '../../../../stores/labels-state';
import notesState from '../../../../stores/notes-state';
import { NotePreviewViewModel } from '../../../../view-models/note-preview-view-model';
import { updateLabel as updateLabelApi } from '../../../../api/labels-api';

type MENU_PANEL = 'default' | 'addLabel';

@Component({
  tag: 'hellodash-note-edit-dropdown',
  styleUrl: 'hellodash-note-edit-dropdown.css',
  shadow: true,
})
export class HellodashNoteEditDropdown {
  //#region Own properties
  dropdown: HTMLDashDropdownElement;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  dropdownVisible: boolean = false;

  @State()
  dropdownMenuPanel: MENU_PANEL = 'default';

  @State()
  creatingLabel = false;
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  notePreview: NotePreviewViewModel;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashNoteEditDropdownVisibleChanged',
  })
  dashNoteEditDropdownVisibleChanged: EventEmitter<boolean>;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  handleDropdownVisibleChanged(e: DashDropdownCustomEvent<void>) {
    const open = e.target.open;
    this.dropdownVisible = open;

    if (!open) {
      this.dropdownMenuPanel = 'default';
    }

    this.dashNoteEditDropdownVisibleChanged.emit(open);
  }
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  addLabel(id: number) {
    this.notePreview.labels = [...this.notePreview.labels, id];
    notesState.updateNotePreview(this.notePreview);
  }

  removeLabel(id: number) {
    this.notePreview.labels = this.notePreview.labels.filter(l => l !== id);
    notesState.updateNotePreview(this.notePreview);
  }

  async createLabel(label: Label) {
    this.creatingLabel = true;
    try {
      const createdLabel = await labelsState.addLabel(label);
      this.addLabel(createdLabel.id);
    } finally {
      this.creatingLabel = false;
    }
  }

  updateLabel(label: LabelViewModel) {
    updateLabelApi(label.__toModel());
  }

  duplicateNote() {
    notesState.duplicateNote(this.notePreview);
    this.dropdown.close();
  }

  deleteNote() {
    notesState.archiveNote(this.notePreview);
  }
  //#endregion

  render() {
    const noteLabels = labelsState.getLabelsByIds(this.notePreview.labels);

    return (
      <dash-dropdown ref={element => (this.dropdown = element)} placement='bottom-end' autoClose onDashDropdownOpenChange={this.handleDropdownVisibleChanged.bind(this)}>
        <dash-icon-button slot='dropdown-trigger' class='options-button' icon='three-dots-vertical' scale='l'></dash-icon-button>

        <dash-list class={this.dropdownMenuPanel !== 'default' ? 'invisible' : ''} selectionMode='none'>
          <dash-list-item onDashListItemSelectedChanged={() => (this.dropdownMenuPanel = 'addLabel')}>Add label</dash-list-item>
          <dash-list-item onDashListItemSelectedChanged={this.duplicateNote.bind(this)}>Duplicate</dash-list-item>
          <dash-list-item onDashListItemSelectedChanged={this.deleteNote.bind(this)}>Delete</dash-list-item>
        </dash-list>

        <hellodash-label-select
          class={this.dropdownMenuPanel !== 'addLabel' ? 'invisible' : ''}
          labels={noteLabels}
          allLabels={labelsState.labels}
          canCreateLabel={!this.creatingLabel}
          onDashLabelSelectLabelAdded={e => this.addLabel(e.detail.id)}
          onDashLabelSelectLabelRemoved={e => this.removeLabel(e.detail.id)}
          onDashLabelSelectLabelCreated={e => this.createLabel(e.detail)}
          onDashLabelSelectLabelUpdated={e => this.updateLabel(e.detail)}
          autoFocus
        ></hellodash-label-select>
      </dash-dropdown>
    );
  }
}
