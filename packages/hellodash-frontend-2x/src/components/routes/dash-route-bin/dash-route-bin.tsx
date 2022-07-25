import { Component, h, State } from '@stencil/core';
import notesState from '../../../stores/notes-state';
import { NotePreviewViewModel } from '../../../view-models/note-preview-view-model';
import { dashRootService } from '../../dash-root/dash-root-service';

@Component({
  tag: 'dash-route-bin',
  styleUrl: 'dash-route-bin.css',
  shadow: true,
})
export class DashRouteBin {
  //#region Own properties
  windowResizeCallback: (e: UIEvent) => void;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  noteWithDropdownActive: NotePreviewViewModel;

  @State()
  selectedNotes: Map<number, NotePreviewViewModel> = new Map<number, NotePreviewViewModel>();

  @State()
  mobileView: boolean;
  //#endregion

  //#region @Prop
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  connectedCallback() {
    this.windowResizeCallback = () => {
      this.setMobileView();
    };
    window.addEventListener('resize', this.windowResizeCallback);

    this.setMobileView();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.windowResizeCallback);
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  setMobileView() {
    if (document.body.clientWidth < 600 && !this.mobileView) {
      this.mobileView = true;
    } else if (document.body.clientWidth >= 600 && this.mobileView) {
      this.mobileView = false;
    }
  }

  noteClicked(notePreview: NotePreviewViewModel) {
    if (this.selectedNotes.has(notePreview.id)) {
      this.selectedNotes.delete(notePreview.id);
      this.selectedNotes = new Map(this.selectedNotes);
      return;
    }

    this.selectedNotes.set(notePreview.id, notePreview);
    this.selectedNotes = new Map(this.selectedNotes);
  }

  restoreNotes() {
    this.selectedNotes.forEach(note => {
      notesState.restoreNote(note);
    });

    this.selectedNotes = new Map();
  }

  async deleteNotes() {
    const confirmModal = (
      <dash-confirm
        onDashConfirmConfirmed={() => {
          this.selectedNotes.forEach(note => {
            notesState.deleteNote(note);
          });

          this.selectedNotes = new Map();
        }}
      >
        <div>Selected notes ({this.selectedNotes.size}) will be deleted forever.</div>
      </dash-confirm>
    );
    dashRootService.showModal(confirmModal);
  }

  selectAll() {
    this.selectedNotes = new Map(notesState.archivedNotePreviews.map(n => [n.id, n]));
  }

  deselectAll() {
    this.selectedNotes = new Map();
  }
  //#endregion

  render() {
    const archivedNotes = notesState.archivedNotePreviews;

    return (
      <dash-section stickyHeader>
        {!!archivedNotes.length && [
          <div class='header' slot='header'>
            <span class='notes-selected'>{this.selectedNotes.size ? `Selected: ${this.selectedNotes.size}` : ''}</span>
            <div class='content-end'>
              {!this.mobileView && [
                <dash-button onClick={() => (this.selectedNotes.size === archivedNotes.length ? this.deselectAll() : this.selectAll())}>
                  {this.selectedNotes.size === archivedNotes.length ? 'Deselect all' : 'Select all'}
                </dash-button>,
                <dash-button disabled={this.selectedNotes.size === 0} onClick={this.restoreNotes.bind(this)}>
                  Restore
                </dash-button>,
                <dash-button disabled={this.selectedNotes.size === 0} onClick={this.deleteNotes.bind(this)}>
                  Delete
                </dash-button>,
              ]}

              {this.mobileView && (
                <dash-dropdown placement='bottom-end' autoClose>
                  <dash-icon-button slot='dropdown-trigger' icon='three-dots-vertical' scale='l'></dash-icon-button>

                  <dash-list selectionMode='none'>
                    <dash-list-item onDashListItemSelectedChanged={() => (this.selectedNotes.size === archivedNotes.length ? this.deselectAll() : this.selectAll())}>
                      {this.selectedNotes.size === archivedNotes.length ? 'Deselect all' : 'Select all'}
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
            {notesState.archivedNotePreviews.map(notePreview => (
              <dash-note-card
                key={notePreview.id}
                class={this.noteWithDropdownActive === notePreview ? 'note-overlay' : undefined}
                selected={this.selectedNotes.has(notePreview.id)}
                notePreview={notePreview}
                mode='selectable'
                onClick={() => this.noteClicked(notePreview)}
              ></dash-note-card>
            ))}
          </dash-grid>,
        ]}

        {!notesState.archivedNotePreviews.length && <div class='bin-empty-message'>Bin is empty</div>}
      </dash-section>
    );
  }
}
