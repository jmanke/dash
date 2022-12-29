import { Component, Event, EventEmitter, h, Listen, Prop, State } from '@stencil/core';
import labelsState from '../../../../stores/labels-store';
import notesState from '../../../../stores/notes-state';
import { NotePreviewViewModel } from '../../../../view-models/note-preview-view-model';

type MENU_PANEL = 'default' | 'addLabel';

@Component({
  tag: 'dash-note-edit-dropdown',
  styleUrl: 'dash-note-edit-dropdown.css',
  shadow: true,
})
export class DashNoteEditDropdown {
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
  @Listen('dropdownVisibleChanged')
  handleDropdownVisibleChanged(e: CustomEvent<boolean>) {
    this.dropdownVisible = e.detail;

    if (!e.detail) {
      this.dropdownMenuPanel = 'default';
    }

    this.dashNoteEditDropdownVisibleChanged.emit(e.detail);
  }
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
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
      <dash-dropdown ref={element => (this.dropdown = element)} placement='bottom-end' autoClose>
        <dash-icon-button slot='dropdown-trigger' class='options-button' icon='three-dots-vertical' scale='l'></dash-icon-button>

        <div class='dropdown-content'>
          {this.dropdownMenuPanel === 'default' && (
            <dash-list selectionMode='none'>
              <dash-list-item onDashListItemSelectedChanged={() => (this.dropdownMenuPanel = 'addLabel')}>Add label</dash-list-item>
              <dash-list-item onDashListItemSelectedChanged={this.duplicateNote.bind(this)}>Duplicate</dash-list-item>
              <dash-list-item onDashListItemSelectedChanged={this.deleteNote.bind(this)}>Delete</dash-list-item>
            </dash-list>
          )}

          {this.dropdownMenuPanel === 'addLabel' && (
            <dash-label-select
              labels={noteLabels}
              onDashLabelSelectLabelAdded={e => {
                this.notePreview.labels = [...this.notePreview.labels, e.detail.id];
                notesState.updateNotePreview(this.notePreview);
              }}
              onDashLabelSelectLabelRemoved={e => {
                this.notePreview.labels = this.notePreview.labels.filter(l => l !== e.detail.id);
                notesState.updateNotePreview(this.notePreview);
              }}
              autoFocus
            ></dash-label-select>
          )}
        </div>
      </dash-dropdown>
    );
  }
}
