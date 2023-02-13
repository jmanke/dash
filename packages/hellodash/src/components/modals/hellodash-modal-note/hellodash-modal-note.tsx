import { Component, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';
import { isNumber } from 'lodash';
import CancelationToken from '../../../api/cancellation-token';
import { fetchNote } from '../../../api/note-api';
import { Modal } from '@didyoumeantoast/dash-components/dist/types/interfaces/modal';
import { Note } from '../../../models/note';
import { Label } from '../../../models/label';
import labelsState from '../../../stores/labels-state';
import notesState from '../../../stores/notes-state';
import { NoteViewModel } from '../../../view-models/note-view-model';
import appState from '../../../stores/app-state';
import { LabelViewModel } from '../../../view-models/label-view-model';
import { updateLabel as updateLabelApi } from '../../../api/labels-api';

const PREVIEW_CONTENT_LENGTH = 140;
const SAVE_DELAY = 5 * 1000;

@Component({
  tag: 'hellodash-modal-note',
  styleUrl: 'hellodash-modal-note.css',
})
export class HellodashModalNote implements Modal {
  //#region Own properties
  modal: HTMLDashModalElement;
  textEditor: HTMLHellodashTextEditorElement;
  cancelationToken = new CancelationToken();
  dropdownElement: HTMLDashDropdownElement;
  saveDefer: any;
  isNoteDirty: boolean;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  isFullscreen: boolean;

  @State()
  note: NoteViewModel;

  @State()
  noteEditorLoaded: boolean;

  @State()
  disableReadonly: boolean = false;

  @State()
  creatingLabel: boolean = false;
  //#endregion

  //#region @Prop
  @Prop()
  noteId: number;

  // if true, creates a new note
  @Prop()
  newNote: boolean;

  @Prop()
  newLabelId?: number;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashModalBeforeClose',
  })
  dashModalBeforeClose: EventEmitter;

  @Event({
    eventName: 'dashModalClosed',
  })
  dashModalClosed: EventEmitter;
  //#endregion

  //#region Component lifecycle
  async componentWillLoad() {
    this.getNote();
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async close() {
    return this.modal.close();
  }
  //#endregion

  //#region Local methods
  async getNote() {
    if (this.newNote) {
      this.disableReadonly = true;
      const note = new Note();
      note.title = 'New note';
      if (isNumber(this.newLabelId)) {
        note.labels = [this.newLabelId];
      }

      const createdNote = await notesState.addNote(note);
      this.note = new NoteViewModel(createdNote);
      return;
    }

    const note = await fetchNote(this.noteId, this.cancelationToken);
    this.note = new NoteViewModel(note);
  }

  addLabel(id: number) {
    this.note.labels = [...this.note.labels, id];
    this.noteUpdated();
  }

  removeLabel(id: number) {
    this.note.labels = this.note.labels.filter(l => l !== id);
    this.noteUpdated();
  }

  async createLabel(label: Label) {
    this.creatingLabel = true;
    try {
      const newLabel = await labelsState.addLabel(label);
      this.addLabel(newLabel.id);
    } finally {
      this.creatingLabel = false;
    }
  }

  updateLabel(label: LabelViewModel) {
    updateLabelApi(label.__toModel());
  }

  textEditorContentChanged(content: string) {
    this.note.content = content;
    this.noteUpdated();
  }

  textEditorHeadingChanged(heading: string) {
    this.note.title = heading;
    this.noteUpdated();
  }

  // TODO: switch to a debounce
  noteUpdated() {
    clearTimeout(this.saveDefer);
    this.saveDefer = setTimeout(() => {
      this.saveNote();
    }, SAVE_DELAY);
  }

  textEditorInit(textEditor: HTMLHellodashTextEditorElement) {
    this.noteEditorLoaded = true;

    if (this.newNote) {
      textEditor.selectTitle();
    } else {
      textEditor.setFocus();
    }
  }

  textEditorNodeChanged() {
    this.dropdownElement?.close();
  }

  /**
   * Saves the current state of the note text editor
   */
  async saveNote() {
    const save = async () => {
      clearTimeout(this.saveDefer);
      this.saveDefer = null;
      const textContent = await this.textEditor.getTextContent();
      this.note.previewContent = textContent.substring(0, PREVIEW_CONTENT_LENGTH);

      return notesState.updateNote(this.note);
    };

    try {
      const isDirty = await this.textEditor.isEditorDirty();
      if (!isDirty) {
        if (this.saveDefer) {
          return save();
        }

        return;
      }

      await this.textEditor.save(false);
      const content = await this.textEditor.getContent();
      this.textEditorContentChanged(content);
      return save();
    } catch (error) {
      console.error(error);
    }
  }

  beforeModalClose() {
    this.cancelationToken.cancel();
    this.saveNote();
  }

  beforeTextEditorUnload(e: CustomEvent<Promise<unknown>[]>) {
    if (!appState.mobileView || this.disableReadonly) {
      return;
    }

    const promises = e.detail;
    promises.push(this.saveNote());
  }
  //#endregion

  render() {
    const labels = this.note ? labelsState.getLabelsByIds(this.note.labels) : [];

    return (
      <dash-modal fullscreen={this.isFullscreen} ref={element => (this.modal = element)} open onDashModalBeforeClose={this.beforeModalClose.bind(this)}>
        <hellodash-text-editor
          ref={element => (this.textEditor = element)}
          theme={appState.settings.theme}
          heading={this.note?.title ?? ''}
          content={this.note?.content ?? ''}
          resize={false}
          showTitleInput={true}
          loading={!this.note}
          deferLoadTime={250}
          readonly={appState.mobileView && !this.disableReadonly}
          onDashTextEditorContentChanged={e => this.textEditorContentChanged(e.detail)}
          onDashTextEditorHeadingChanged={e => this.textEditorHeadingChanged(e.detail)}
          onDashTextEditorFullscreenChanged={e => (this.isFullscreen = e.detail)}
          onDashTextEditorNodeChanged={this.textEditorNodeChanged.bind(this)}
          onDashTextEditorInit={e => this.textEditorInit(e.detail)}
          onDashTextEditorBeforeUnload={this.beforeTextEditorUnload.bind(this)}
          onDashTextEditorUnload={() => (this.noteEditorLoaded = false)}
          showFullscreen
        ></hellodash-text-editor>

        <div class='labels-container'>
          {this.note &&
            this.noteEditorLoaded &&
            labels.map(l => (
              <dash-chip heading={l.text} color={l.color} dismissible onDashChipDismiss={() => this.removeLabel(l.id)} dismissTooltipText='Remove label' selectable></dash-chip>
            ))}
        </div>

        <dash-dropdown slot='footer-start' ref={element => (this.dropdownElement = element)} placementStrategy='fixed' placement='top-start' autoClose>
          <dash-icon-button slot='dropdown-trigger' class='show-label-edit' icon='plus-circle' scale='l'></dash-icon-button>

          <hellodash-label-select
            labels={labels}
            allLabels={labelsState.labels}
            canCreateLabel={!this.creatingLabel}
            onDashLabelSelectLabelAdded={e => {
              this.addLabel(e.detail.id);
            }}
            onDashLabelSelectLabelRemoved={e => {
              this.removeLabel(e.detail.id);
            }}
            onDashLabelSelectLabelCreated={e => this.createLabel(e.detail)}
            onDashLabelSelectLabelUpdated={e => this.updateLabel(e.detail)}
          ></hellodash-label-select>
        </dash-dropdown>

        {appState.mobileView && (
          <dash-button class='edit-note-btn' slot='footer-end' scale='l' onClick={() => (this.disableReadonly = !this.disableReadonly)} disabled={!this.noteEditorLoaded}>
            {this.disableReadonly ? 'View' : 'Edit'}
          </dash-button>
        )}
      </dash-modal>
    );
  }
}
