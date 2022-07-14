import { Component, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';
import { isNumber } from 'lodash';
import CancelationToken from '../../../api/cancellation-token';
import { fetchNote } from '../../../api/note-api';
import { Modal } from '../../../interfaces/modal';
import { Note } from '../../../models/note';
import labelsState from '../../../stores/labels-store';
import notesState from '../../../stores/notes-state';
import { LabelViewModel } from '../../../view-models/label-view-model';
import { NoteViewModel } from '../../../view-models/note-view-model';
import { TextEditorContent } from '../../ui/dash-text-editor/dash-text-editor';

const PREVIEW_CONTENT_LENGTH = 100;
const SAVE_DELAY = 5 * 1000;

@Component({
  tag: 'dash-modal-note',
  styleUrl: 'dash-modal-note.css',
})
export class DashModalNote implements Modal {
  //#region Own properties
  modal: HTMLDashModalElement;
  textEditor: HTMLDashTextEditorElement;
  cancelationToken = new CancelationToken();
  saveDefer: any;
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
    await this.getNote();
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

  removeLabel(label: LabelViewModel) {
    this.note.labels = this.note.labels.filter(l => l !== label.id);
    this.noteUpdated();
  }

  textEditorContentChanged(event: TextEditorContent) {
    if (!event || !event.textContent) {
      return;
    }

    // remove new lines, breaks and truncate string to reasonable length for a preview
    const previewContent = event.textContent.replace(/(\r\n|\n|\r)/gm, '').substring(0, PREVIEW_CONTENT_LENGTH);
    this.note.content = event.rawContent;
    this.note.previewContent = previewContent;
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

  async saveNote() {
    clearTimeout(this.saveDefer);
    this.saveDefer = null;
    this.note.updatePreviewContent();

    await notesState.updateNote(this.note);
  }

  textEditorInit(textEditor: HTMLDashTextEditorElement) {
    this.noteEditorLoaded = true;

    if (this.newNote) {
      textEditor.selectTitle();
    } else {
      textEditor.setFocus();
    }
  }

  async beforeModalClose() {
    this.cancelationToken.cancel();
    const content = await this.textEditor.save();
    this.textEditorContentChanged(content);

    this.saveNote();
  }
  //#endregion

  render() {
    const labels = labelsState.getLabelsByIds(this.note.labels);

    return (
      <dash-modal fullscreen={this.isFullscreen} ref={element => (this.modal = element)} onDashModalBeforeClose={this.beforeModalClose.bind(this)}>
        <dash-text-editor
          ref={element => (this.textEditor = element)}
          heading={this.note?.title ?? ''}
          content={this.note?.content ?? ''}
          resize={false}
          showTitleInput={true}
          loading={!this.note}
          deferLoadTime={250}
          onDashTextEditorContentChanged={e => this.textEditorContentChanged(e.detail)}
          onDashTextEditorHeadingChanged={e => this.textEditorHeadingChanged(e.detail)}
          onDashTextEditorFullscreenChanged={e => (this.isFullscreen = e.detail)}
          onDashTextEditorInit={e => this.textEditorInit(e.detail)}
          showFullscreen
        ></dash-text-editor>

        <div class='labels-container'>
          {this.note &&
            this.noteEditorLoaded &&
            labels.map(l => (
              <dash-chip heading={l.text} color={l.color} removeable onDashChipRemove={() => this.removeLabel(l)} dismissTooltipText='Remove label' selectable></dash-chip>
            ))}
        </div>

        <dash-dropdown slot='footer-start' placementStrategy='fixed' placement='top-start' autoClose>
          <dash-icon-button slot='dropdown-trigger' class='show-label-edit' icon='plus-circle'></dash-icon-button>

          <dash-label-select
            labels={labels}
            onDashLabelSelectLabelAdded={e => {
              this.note.labels = [...this.note.labels, e.detail.id];
            }}
            onDashLabelSelectLabelRemoved={e => {
              this.note.labels = this.note.labels.filter(l => l !== e.detail.id);
            }}
          ></dash-label-select>
        </dash-dropdown>
      </dash-modal>
    );
  }
}
