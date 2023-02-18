import { Component, h, State, Watch } from '@stencil/core';
import { orderBy } from 'lodash';
import { Note } from '../../../models/note';
import { Label } from '../../../models/label';
import { dashRootService } from '../../dash-root/dash-root-service';
import { dispatch, store } from '../../../store';
import { Unsubscribe } from '@reduxjs/toolkit';
import { deleteNote, restoreNote } from '../../../slices/notes-slice';
import { Status } from '../../../enums/status';
import { DateTime } from 'luxon';

@Component({
  tag: 'hellodash-route-bin',
  styleUrl: 'hellodash-route-bin.css',
  shadow: true,
})
export class HellodashRouteBin {
  //#region Own properties
  unsubscribeStore: Unsubscribe;
  //#endregion

  //#region @Element

  @State()
  notes: Note[] = [];
  @Watch('notes')
  notesChanged(notes: Note[] = []) {
    this.archivedNotes = notes.filter(note => note.status === Status.Archived);
  }

  @State()
  archivedNotes: Note[] = [];

  @State()
  labels: Label[] = [];

  //#endregion

  //#region @State
  @State()
  noteWithDropdownActive: Note;

  @State()
  selectedNotes: Map<number, Note> = new Map<number, Note>();
  //#endregion

  //#region @Prop
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle

  connectedCallback() {
    const storeUpdated = () => {
      this.notes = store.getState().notes;
      this.labels = store.getState().labels;
    };

    storeUpdated();
    this.unsubscribeStore = store.subscribe(storeUpdated);
  }

  disconnectedCallback() {
    this.unsubscribeStore();
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  noteClicked(note: Note) {
    if (this.selectedNotes.has(note.id)) {
      this.selectedNotes.delete(note.id);
      this.selectedNotes = new Map(this.selectedNotes);
      return;
    }

    this.selectedNotes.set(note.id, note);
    this.selectedNotes = new Map(this.selectedNotes);
  }

  restoreNotes() {
    this.selectedNotes.forEach(note => {
      dispatch(restoreNote(note));
    });

    this.selectedNotes = new Map();
  }

  async deleteNotes() {
    const confirmModal = (
      <hellodash-confirm
        onDashConfirmConfirmed={() => {
          this.selectedNotes.forEach(note => {
            dispatch(deleteNote(note));
          });

          this.selectedNotes = new Map();
        }}
      >
        <div>Selected notes ({this.selectedNotes.size}) will be deleted forever.</div>
      </hellodash-confirm>
    );
    dashRootService.showModal(confirmModal);
  }

  selectAll() {
    this.selectedNotes = new Map(this.archivedNotes.map(n => [n.id, n]));
  }

  deselectAll() {
    this.selectedNotes = new Map();
  }
  //#endregion

  render() {
    const { mobileView } = store.getState().appState;

    return (
      <dash-section stickyHeader>
        {this.archivedNotes.length && [
          <div class='header' slot='header'>
            <span class='notes-selected'>{this.selectedNotes.size ? `Selected: ${this.selectedNotes.size}` : ''}</span>
            <div class='content-end'>
              {!mobileView && [
                <dash-button onClick={() => (this.selectedNotes.size === this.archivedNotes.length ? this.deselectAll() : this.selectAll())}>
                  {this.selectedNotes.size === this.archivedNotes.length ? 'Deselect all' : 'Select all'}
                </dash-button>,
                <dash-button disabled={this.selectedNotes.size === 0} onClick={this.restoreNotes.bind(this)}>
                  Restore
                </dash-button>,
                <dash-button disabled={this.selectedNotes.size === 0} onClick={this.deleteNotes.bind(this)}>
                  Delete
                </dash-button>,
              ]}

              {mobileView && (
                <dash-dropdown placement='bottom-end' autoClose>
                  <dash-icon-button slot='dropdown-trigger' icon='three-dots-vertical' scale='l'></dash-icon-button>

                  <dash-list selectionMode='none'>
                    <dash-list-item onDashListItemSelectedChanged={() => (this.selectedNotes.size === this.archivedNotes.length ? this.deselectAll() : this.selectAll())}>
                      {this.selectedNotes.size === this.archivedNotes.length ? 'Deselect all' : 'Select all'}
                    </dash-list-item>
                    <dash-list-item disabled={this.selectedNotes.size === 0} onDashListItemSelectedChanged={this.restoreNotes.bind(this)}>
                      Restore
                    </dash-list-item>
                    <dash-list-item disabled={this.selectedNotes.size === 0} onDashListItemSelectedChanged={this.deleteNotes.bind(this)}>
                      Delete
                    </dash-list-item>
                  </dash-list>
                </dash-dropdown>
              )}
            </div>
          </div>,

          <dash-grid col-s={1} col-m={2} col-l={3} col-xl={4}>
            {orderBy(this.archivedNotes, [a => DateTime.fromISO(a.lastModified).toMillis()], ['desc']).map(note => (
              <hellodash-note-card
                key={note.id}
                class={this.noteWithDropdownActive === note ? 'note-overlay' : undefined}
                selected={this.selectedNotes.has(note.id)}
                note={note}
                mode='selectable'
                onClick={() => this.noteClicked(note)}
              ></hellodash-note-card>
            ))}
          </dash-grid>,
        ]}

        {!this.archivedNotes.length && <div class='bin-empty-message'>Bin is empty</div>}
      </dash-section>
    );
  }
}
