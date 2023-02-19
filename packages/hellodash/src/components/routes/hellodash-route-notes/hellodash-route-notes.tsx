import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil-community/router';
import { isEmpty, isNumber } from 'lodash';
import { stringSearch } from '@didyoumeantoast/dash-utils';
import { DashFilterCustomEvent } from '@didyoumeantoast/dash-components/dist/types/components';
import { Note } from '../../../models/note';
import { dispatch, store } from '../../../store';
import { Unsubscribe } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { Label } from '../../../models/label';
import { addLabelToNote, archiveNote, createNote, duplicateNote, getNoteById, removeLabelFromNote, updateNote } from '../../../slices/notes-slice';
import { Status } from '../../../enums/status';
import { createLabel, updateLabel } from '../../../slices/labels-slice';

type SortOption = 'date' | 'title' | 'last-modified';

@Component({
  tag: 'hellodash-route-notes',
  styleUrl: 'hellodash-route-notes.css',
})
export class HellodashRouteNotes {
  //#region Own properties
  closeNoteModalCb?: () => void;
  unsubscribeStore: Unsubscribe;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  notes: Note[] = [];
  @Watch('notes')
  notesChanged() {
    this.filterNotes();
  }

  @State()
  filteredNotes: Note[] = [];

  @State()
  labels: Label[];

  @State()
  mobileView: boolean;

  @State()
  notesFilter: string;
  @Watch('notesFilter')
  notesFilterChanged() {
    this.filterNotes();
  }

  @State()
  sortBy: SortOption = 'last-modified';
  @Watch('sortBy')
  sortByChanged() {
    this.filterNotes();
  }

  @State()
  selectedLabelId?: number;
  @Watch('selectedLabelId')
  selectedLabelIdChanged() {
    this.filterNotes();
  }

  @State()
  selectedNote?: Note;

  @State()
  focusedNote: Note;

  @State()
  loadingNote: boolean;
  //#endregion

  //#region @Prop
  @Prop({
    mutable: true,
  })
  history: RouterHistory;

  @Prop()
  match: any;
  @Watch('match')
  async matchChanged(match: any) {
    const noteId = match?.params.noteId ? parseInt(match.params.noteId) : null;
    this.selectedNote = noteId ? this.notes.find(note => note.id === noteId) : null;
    if (this.selectedNote && this.selectedNote.content === null) {
      this.loadingNote = true;
      try {
        this.selectedNote = await dispatch(getNoteById(this.selectedNote.id)).unwrap();
      } finally {
        this.loadingNote = false;
      }
    }

    // don't update selected label when note is being edited
    if (!isNumber(noteId)) {
      this.selectedLabelId = match?.params.labelId ? parseInt(match.params.labelId) : null;
    }
  }
  //#endregion

  //#region @Event
  //#endregion

  // #region Component lifecycle
  async componentWillLoad() {
    this.matchChanged(this.match);
  }

  connectedCallback() {
    const storeUpdated = () => {
      this.notes = store.getState().notes.filter(note => note.status === Status.Active);
      this.labels = store.getState().labels;
      this.mobileView = store.getState().appState.mobileView;
    };

    storeUpdated();
    this.unsubscribeStore = store.subscribe(storeUpdated);
  }

  disconnectedCallback() {
    this.unsubscribeStore();
  }
  // #endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  filterNotes() {
    const filterFns: ((note: Note) => boolean)[] = [];

    // string filter
    if (!isEmpty(this.notesFilter)) {
      const noteFilter = (note: Note) => stringSearch(note.title, this.notesFilter);
      filterFns.push(noteFilter);
    }

    // labels filter
    if (this.selectedLabelId) {
      const labelFilter = (note: Note) => {
        return note.labels?.some(label => this.selectedLabelId === label);
      };
      filterFns.push(labelFilter);
    }

    const notes = filterFns.length ? this.notes.filter(note => filterFns.every(fn => fn(note))) : [...this.notes];

    // sort logic
    switch (this.sortBy) {
      case 'last-modified':
        notes.sort((a, b) => DateTime.fromISO(b.lastModified).toMillis() - DateTime.fromISO(a.lastModified).toMillis());
        break;
      case 'title':
        notes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'date':
        notes.sort((a, b) => DateTime.fromISO(b.created).toMillis() - DateTime.fromISO(a.created).toMillis());
        break;
    }

    this.filteredNotes = notes;
  }

  updateNotesFilterValue(e: DashFilterCustomEvent<void>) {
    this.notesFilter = e.target.filterValue;
  }

  updateSortBy(sortBy: SortOption) {
    this.sortBy = sortBy;
  }

  async addNote() {
    const note = {
      id: -1,
      title: 'New note',
      content: '',
      status: Status.Active,
      previewContent: '',
      labels: this.selectedLabelId ? [this.selectedLabelId] : [],
    };
    this.selectedNote = note;
    const newNote = await dispatch(createNote(note)).unwrap();
    this.history.push(`/note/${newNote.id}`);
  }

  async createLabelForNote(label: Label, note: Note) {
    const newLabel = await dispatch(createLabel(label)).unwrap();
    return dispatch(addLabelToNote({ note, label: newLabel.id }));
  }
  //#endregion

  render() {
    return (
      <Host>
        <dash-section stickyHeader>
          {this.notes?.length > 0 && [
            <div slot='header' class='notes-search-container'>
              <dash-filter class='notes-filter' placeholder='Search' scale='l' onDashFilterValueChanged={this.updateNotesFilterValue.bind(this)}></dash-filter>
              <dash-dropdown class='sort-dropdown' placement='bottom-end' autoClose>
                <dash-icon-button slot='dropdown-trigger' icon='filter' scale='l' tooltipText='Filter notes' tooltipPlacement='right'></dash-icon-button>

                <dash-list selectionMode='single'>
                  <dash-list-item selected={this.sortBy === 'last-modified'} onDashListItemSelectedChanged={this.updateSortBy.bind(this, 'last-modified')}>
                    Sort by last modified
                  </dash-list-item>
                  <dash-list-item selected={this.sortBy === 'date'} onDashListItemSelectedChanged={this.updateSortBy.bind(this, 'date')}>
                    Sort by date created
                  </dash-list-item>
                  <dash-list-item selected={this.sortBy === 'title'} onDashListItemSelectedChanged={this.updateSortBy.bind(this, 'title')}>
                    Sort by title
                  </dash-list-item>
                </dash-list>
              </dash-dropdown>

              <dash-icon-button
                class='add-note-button'
                icon='plus-lg'
                scale='l'
                tooltipText='Add note'
                tooltipPlacement='right'
                onClick={this.addNote.bind(this)}
              ></dash-icon-button>
            </div>,

            this.filteredNotes.length > 0 ? (
              <dash-grid col-s={1} col-m={2} col-l={3} col-xl={4}>
                {this.filteredNotes.map(note => (
                  <hellodash-note-card class={this.focusedNote?.id === note?.id ? 'note-overlay' : undefined} key={note.id} note={note} labels={this.labels}>
                    <hellodash-note-edit-dropdown
                      slot='actions-end'
                      note={note}
                      labels={this.labels}
                      onHellodashNoteEditDeleteNote={() => dispatch(archiveNote(note))}
                      onHellodashNoteEditDuplicateNote={() => dispatch(duplicateNote(note))}
                      onHellodashNoteEditLabelAdded={e => dispatch(addLabelToNote({ note, label: e.detail }))}
                      onHellodashNoteEditLabelRemoved={e => dispatch(removeLabelFromNote({ note, label: e.detail }))}
                      onHellodashNoteEditLabelUpdated={e => dispatch(updateLabel(e.detail))}
                      onHellodashNoteEditLabelCreated={e => this.createLabelForNote(e.detail, note)}
                      onFocusin={() => (this.focusedNote = note)}
                    ></hellodash-note-edit-dropdown>
                  </hellodash-note-card>
                ))}
              </dash-grid>
            ) : (
              <div>No matching notes</div>
            ),
            <dash-fab class='add-note-fab' icon='plus' scale='l' onClick={() => this.addNote()}></dash-fab>,
          ]}

          {!this.notes.length && (
            <div class='note-message-wrapper'>
              <div class='note-message'>Create your first note!</div>
              <dash-fab icon='plus' scale='l' onClick={() => this.addNote()}></dash-fab>
            </div>
          )}
        </dash-section>

        {this.selectedNote && (
          <hellodash-modal-note
            note={this.selectedNote}
            loading={this.loadingNote}
            labels={this.labels}
            mobileView={this.mobileView}
            onDashModalBeforeClose={() => this.history.goBack()}
            onHellodashModalNoteLabelCreated={async e => {
              this.createLabelForNote(e.detail, this.selectedNote);
            }}
            onHellodashModalNoteLabelUpdated={e => dispatch(updateLabel(e.detail))}
            onHellodashModalNoteUpdateNote={e => dispatch(updateNote(e.detail))}
          ></hellodash-modal-note>
        )}
      </Host>
    );
  }
}

injectHistory(HellodashRouteNotes);
