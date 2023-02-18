import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil-community/router';
import { isEmpty, isNumber } from 'lodash';
import { stringSearch } from '@didyoumeantoast/dash-utils';
import { dashRootService } from '../../dash-root/dash-root-service';
import { DashFilterCustomEvent } from '@didyoumeantoast/dash-components/dist/types/components';
import { Note } from '../../../models/note';
import { store } from '../../../store';
import { Unsubscribe } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { Label } from '../../../models/label';
import { noteLabels } from '../../../slices/notes-slice';

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
  labels: Label[];

  @State()
  labelsMap: Map<number, Label> = new Map();

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
  selectedNoteId?: number;
  @Watch('selectedNoteId')
  selectedNoteIdChanged(noteId: number) {
    if (!isNumber(noteId)) {
      return;
    }

    this.closeNoteModalCb = () => {
      this.closeNoteModalCb = null;
      this.history.goBack();
    };
    const noteModal = <hellodash-modal-note noteId={noteId} onDashModalBeforeClose={() => this.closeNoteModalCb?.()}></hellodash-modal-note>;
    dashRootService.showModal(noteModal);
  }

  @State()
  noteWithDropdownActive: Note;
  //#endregion

  //#region @Prop
  @Prop({
    mutable: true,
  })
  history: RouterHistory;

  @Prop()
  match: any;
  @Watch('match')
  matchChanged(match: any) {
    this.selectedNoteId = match?.params.noteId ? parseInt(match.params.noteId) : null;
    // close the modal if the user went back with history
    if (!isNumber(this.selectedNoteId) && this.closeNoteModalCb) {
      this.closeNoteModalCb = null;
      dashRootService.closeModal();
    }

    // don't update selected label when note is being edited
    if (!isNumber(this.selectedNoteId)) {
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
      this.notes = store.getState().notes;
      this.labels = store.getState().labels;
      this.labelsMap.clear();
      this.labels.forEach(label => {
        this.labelsMap.set(label.id, label);
      });
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

    this.notes = notes;
  }

  updateNotesFilterValue(e: DashFilterCustomEvent<void>) {
    this.notesFilter = e.target.filterValue;
  }

  updateSortBy(sortBy: SortOption) {
    this.sortBy = sortBy;
  }

  addNote() {
    const noteModal = <hellodash-modal-note newNote={true} newLabelId={this.selectedLabelId}></hellodash-modal-note>;
    dashRootService.showModal(noteModal);
  }
  //#endregion

  render() {
    return (
      <Host>
        <dash-section stickyHeader>
          {!!this.notes?.length && [
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

            !!this.notes.length ? (
              <dash-grid col-s={1} col-m={2} col-l={3} col-xl={4}>
                {this.notes.map(note => (
                  <hellodash-note-card class={this.noteWithDropdownActive === note ? 'note-overlay' : undefined} key={note.id} note={note} labels={noteLabels(note)}>
                    <hellodash-note-edit-dropdown
                      slot='actions-end'
                      note={note}
                      onDashNoteEditDropdownVisibleChanged={e => (this.noteWithDropdownActive = e.detail ? note : null)}
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
      </Host>
    );
  }
}

injectHistory(HellodashRouteNotes);
