import { Component, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';
import CancelationToken from '../../../api/cancellation-token';
import { Modal } from '@didyoumeantoast/dash-components/dist/types/interfaces/modal';
import { Label } from '../../../models/label';
import { Note } from '../../../models/note';
import { Theme } from '../../../types/types';
import { noteLabels } from '../../../slices/notes-slice';

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
  noteEditorLoaded: boolean;

  @State()
  disableReadonly: boolean = true;
  //#endregion

  //#region @Prop

  @Prop()
  note: Note;

  @Prop()
  labels: Label[];

  @Prop()
  loading: boolean;

  @Prop()
  theme: Theme = 'dark';

  @Prop()
  mobileView: boolean;

  @Prop()
  createLabelDisabled: boolean;

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

  @Event({
    eventName: 'hellodashModalNoteUpdateNote',
  })
  noteUpdated: EventEmitter<Note>;

  @Event({
    eventName: 'hellodashModalNoteLabelCreated',
  })
  labelCreated: EventEmitter<Label>;

  @Event({
    eventName: 'hellodashModalNoteLabelUpdated',
  })
  labelUpdated: EventEmitter<Label>;
  //#endregion

  //#region Component lifecycle
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
  addLabel(id: number) {
    this.note.labels = [...this.note.labels, id];
    this.updateNote();
  }

  removeLabel(id: number) {
    this.note.labels = this.note.labels.filter(l => l !== id);
    this.updateNote();
  }

  createLabel(label: Label) {
    this.labelCreated.emit(label);
  }

  updateLabel(label: Label) {
    this.labelUpdated.emit(label);
  }

  textEditorContentChanged(content: string) {
    this.note.content = content;
    this.updateNote();
  }

  textEditorHeadingChanged(heading: string) {
    this.note.title = heading;
    this.updateNote();
  }

  // TODO: switch to a debounce
  updateNote() {
    clearTimeout(this.saveDefer);
    this.saveDefer = setTimeout(() => {
      this.saveNote();
    }, SAVE_DELAY);
  }

  textEditorInit(textEditor: HTMLHellodashTextEditorElement) {
    this.noteEditorLoaded = true;

    textEditor.setFocus();
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

      this.noteUpdated.emit(this.note);
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
    if (!this.mobileView || this.disableReadonly) {
      return;
    }

    const promises = e.detail;
    promises.push(this.saveNote());
  }
  //#endregion

  render() {
    const labels = this.note ? noteLabels(this.note) : [];

    return (
      <dash-modal fullscreen={this.isFullscreen} ref={element => (this.modal = element)} open onDashModalBeforeClose={this.beforeModalClose.bind(this)}>
        <hellodash-text-editor
          ref={element => (this.textEditor = element)}
          theme={this.theme}
          heading={this.note?.title ?? ''}
          content={this.note?.content ?? ''}
          resize={false}
          showTitleInput={true}
          loading={!this.note}
          deferLoadTime={250}
          readonly={!this.disableReadonly ?? false}
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
            allLabels={this.labels}
            canCreateLabel={!this.createLabelDisabled}
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

        {this.mobileView && (
          <dash-button class='edit-note-btn' slot='footer-end' scale='l' onClick={() => (this.disableReadonly = !this.disableReadonly)} disabled={!this.noteEditorLoaded}>
            {this.disableReadonly ? 'View' : 'Edit'}
          </dash-button>
        )}
      </dash-modal>
    );
  }
}
