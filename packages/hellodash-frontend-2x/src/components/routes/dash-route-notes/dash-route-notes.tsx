import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil/router';
import { isEmpty, isNumber } from 'lodash';
import notesState from '../../../stores/notes-state';
import { stringSearch } from 'didyoumeantoast-dash-utils';
import { dashRootService } from '../../dash-root/dash-root-service';
import { NotePreviewViewModel } from '../../../view-models/note-preview-view-model';

type SortOption = 'date' | 'title';

@Component({
  tag: 'dash-route-notes',
  styleUrl: 'dash-route-notes.css',
})
export class DashRouteNotes {
  //#region Own properties
  notesChangedListener: () => void;
  closeNoteModalCb?: () => void;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  notePreviews: NotePreviewViewModel[] = [];

  @State()
  notesFilter: string;
  @Watch('notesFilter')
  notesFilterChanged() {
    this.filterNotes();
  }

  @State()
  sortBy: SortOption = 'date';
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
    const noteModal = <dash-modal-note noteId={noteId} onDashModalBeforeClose={() => this.closeNoteModalCb?.()}></dash-modal-note>;
    dashRootService.showModal(noteModal);
  }

  @State()
  noteWithDropdownActive: NotePreviewViewModel;

  @State()
  addNoteButton: HTMLDashIconButtonElement;
  //#endregion

  //#region @Prop
  @Prop()
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
    // ensure each state manager is initialized
    this.filterNotes();
    this.notesChangedListener = this.filterNotes.bind(this);
    notesState.addNotesChangedListener(this.notesChangedListener);
    this.matchChanged(this.match);
  }

  disconnectedCallback() {
    notesState.removeNotesChangedListener(this.notesChangedListener);
    this.notesChangedListener = null;
  }
  // #endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  filterNotes() {
    const filterFns: ((note: NotePreviewViewModel) => boolean)[] = [];

    // string filter
    if (!isEmpty(this.notesFilter)) {
      const noteFilter = (note: NotePreviewViewModel) => stringSearch(note.title, this.notesFilter);
      filterFns.push(noteFilter);
    }

    // labels filter
    if (this.selectedLabelId) {
      const labelFilter = (note: NotePreviewViewModel) => {
        return note.labels?.some(label => this.selectedLabelId === label);
      };
      filterFns.push(labelFilter);
    }

    const notePreviews = filterFns.length ? notesState.notePreviews.filter(note => filterFns.every(fn => fn(note))) : [...notesState.notePreviews];

    // sort logic
    if (this.sortBy === 'title') {
      notePreviews.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === 'date') {
      notePreviews.sort((a, b) => b.dateCreated.toMillis() - a.dateCreated.toMillis());
    }

    this.notePreviews = notePreviews;
  }

  updateNotesFilterValue(e: CustomEvent<string>) {
    this.notesFilter = e.detail;
  }

  updateSortBy(sortBy: SortOption, e: CustomEvent<boolean>) {
    if (e.detail) {
      this.sortBy = sortBy;
    }
  }

  addNote() {
    const noteModal = <dash-modal-note newNote={true} newLabelId={this.selectedLabelId}></dash-modal-note>;
    dashRootService.showModal(noteModal);
  }
  //#endregion

  render() {
    return (
      <Host>
        <dash-section stickyHeader>
          {!!notesState.notePreviews.length && [
            <div slot='header' class='notes-search-container'>
              <dash-filter class='notes-filter' placeholder='Search' scale='l' onDashFilterValueChanged={this.updateNotesFilterValue.bind(this)}></dash-filter>
              <dash-dropdown class='sort-dropdown' placement='bottom-end' autoClose>
                <dash-icon-button slot='dropdown-trigger' icon='filter' scale='l'></dash-icon-button>

                <dash-list selectionMode='single'>
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
                ref={element => {
                  setTimeout(() => {
                    this.addNoteButton = element;
                  }, 0);
                }}
                icon='plus-lg'
                scale='l'
                onClick={this.addNote.bind(this)}
              ></dash-icon-button>
              <dash-tooltip class='add-note-tooltip' target={this.addNoteButton} text={'Add note'} placement='right' placementStrategy='fixed' offsetX={5}></dash-tooltip>
            </div>,

            !!this.notePreviews.length ? (
              <dash-grid col-s={1} col-m={2} col-l={3} col-xl={4}>
                {this.notePreviews.map(note => (
                  <dash-note-card class={this.noteWithDropdownActive === note ? 'note-overlay' : undefined} key={note.id} notePreview={note}>
                    <dash-note-edit-dropdown
                      slot='actions-end'
                      notePreview={note}
                      onDashNoteEditDropdownVisibleChanged={e => (this.noteWithDropdownActive = e.detail ? note : null)}
                    ></dash-note-edit-dropdown>
                  </dash-note-card>
                ))}
              </dash-grid>
            ) : (
              <div>No matching notes</div>
            ),
            <dash-fab class='add-note-fab' icon='plus' onClick={() => this.addNote()}></dash-fab>,
          ]}

          {!notesState.notePreviews.length && (
            <div class='note-message-wrapper'>
              <div class='note-message'>
                <dash-fab icon='plus' onClick={() => this.addNote()}></dash-fab>
              </div>
            </div>
          )}
        </dash-section>
      </Host>
    );
  }
}

injectHistory(DashRouteNotes);
