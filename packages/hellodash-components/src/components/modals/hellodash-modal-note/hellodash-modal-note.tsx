import { Modal } from '@didyoumeantoast/dash-components';
import { Label, Note, Theme } from '@didyoumeantoast/hellodash-models';
import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import produce from 'immer';
import { noteLabels } from '../../../utils/note-labels';

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
  dropdownElement: HTMLDashDropdownElement;
  saveDefer: any;
  isNoteDirty: boolean;

  //#endregion

  //#region @Element

  @Element() element: HTMLHellodashModalNoteElement;

  //#endregion

  //#region @State

  @State() noteDraft: Note;
  @Watch('noteDraft')
  noteDraftChaged(noteDraft: Note, prevNoteDraft: Note) {
    if (noteDraft && noteDraft.id !== prevNoteDraft?.id) {
      this.textEditor.setHeading(noteDraft.title);
      this.textEditor.setContent(noteDraft.content);
    } else if (!noteDraft) {
      this.textEditor?.setHeading('');
      this.textEditor?.setContent('');
    }

    this.noteDraftLabels = noteDraft ? noteLabels(noteDraft, this.allLabels) : [];
  }

  @State() noteDraftLabels: Label[];

  @State() isFullscreen: boolean;

  @State() disableReadonly: boolean = true;

  //#endregion

  //#region @Prop

  /**
   * When `true`, the modal is open
   */
  @Prop({ reflect: true }) open: boolean;
  @Watch('open')
  openChanged(open: boolean) {
    if (open) {
      this.textEditor?.setFocus();
    }
  }

  @Prop() note: Note;
  @Watch('note')
  noteChanged(note: Note) {
    this.noteDraft = !!note ? { ...note } : null;
  }

  @Prop() allLabels: Label[];
  @Watch('allLabels')
  allLabelsChanged(allLabels: Label[]) {
    this.noteDraftLabels = noteLabels(this.noteDraft, allLabels);
  }

  @Prop({ reflect: true }) loading: boolean;

  @Prop({ reflect: true }) theme: Theme = 'dark';

  @Prop({ reflect: true }) mobileView: boolean;

  @Prop({ reflect: true }) createLabelDisabled: boolean;

  //#endregion

  //#region @Event

  @Event({ eventName: 'dashModalBeforeClose' }) dashModalBeforeClose: EventEmitter;

  @Event({ eventName: 'dashModalClosed' }) dashModalClosed: EventEmitter;

  @Event({ eventName: 'hellodashModalNoteUpdateNote' }) noteUpdated: EventEmitter<Note>;

  @Event({ eventName: 'hellodashModalNoteLabelCreated' }) labelCreated: EventEmitter<Label>;

  @Event({ eventName: 'hellodashModalNoteLabelUpdated' }) labelUpdated: EventEmitter<Label>;

  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.noteChanged(this.note);
  }

  componentDidLoad() {
    this.textEditor = this.element.querySelector('hellodash-text-editor');
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

  addLabel(id: number) {
    this.noteDraft = produce(this.noteDraft, draft => {
      draft.labels.push(id);
    });
    this.updateNote();
  }

  removeLabel(id: number) {
    this.noteDraft = produce(this.noteDraft, draft => {
      draft.labels = draft.labels.filter(l => l !== id);
    });
    this.updateNote();
  }

  createLabel(label: Label) {
    this.labelCreated.emit(label);
  }

  updateLabel(label: Label) {
    this.labelUpdated.emit(label);
  }

  textEditorContentChanged(content: string) {
    this.noteDraft = produce(this.noteDraft, draft => {
      draft.content = content;
    });
    this.updateNote();
  }

  textEditorHeadingChanged(heading: string) {
    this.noteDraft = produce(this.noteDraft, draft => {
      draft.title = heading;
    });
    this.updateNote();
  }

  // TODO: switch to a debounce
  updateNote() {
    clearTimeout(this.saveDefer);
    this.saveDefer = setTimeout(() => {
      this.saveNote();
    }, SAVE_DELAY);
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
      this.noteDraft = produce(this.noteDraft, draft => {
        draft.previewContent = textContent.substring(0, PREVIEW_CONTENT_LENGTH);
      });

      this.noteUpdated.emit(this.noteDraft);
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
    const labels = this.noteDraftLabels ?? [];

    return (
      <dash-modal fullscreen={this.isFullscreen} ref={element => (this.modal = element)} open={this.open} onDashModalBeforeClose={this.beforeModalClose.bind(this)}>
        <hellodash-text-editor
          theme={this.theme}
          heading={this.noteDraft?.title ?? ''}
          content={this.noteDraft?.content ?? ''}
          resize={false}
          showTitleInput={true}
          loading={this.loading}
          readonly={!this.disableReadonly ?? false}
          onHellodashTextEditorContentChanged={e => this.textEditorContentChanged(e.detail)}
          onHellodashTextEditorHeadingChanged={e => this.textEditorHeadingChanged(e.detail)}
          onHellodashTextEditorFullscreenChanged={e => (this.isFullscreen = e.detail)}
          onHellodashTextEditorNodeChanged={this.textEditorNodeChanged.bind(this)}
          showFullscreen
        ></hellodash-text-editor>

        <div class='labels-container'>
          {this.noteDraft &&
            labels.map(l => (
              <dash-chip
                key={l.id}
                heading={l.text}
                color={l.color}
                dismissible
                onDashChipDismiss={() => this.removeLabel(l.id)}
                dismissTooltipText='Remove label'
                selectable
              ></dash-chip>
            ))}
        </div>

        <dash-dropdown slot='footer-start' ref={element => (this.dropdownElement = element)} placementStrategy='fixed' placement='top-start' autoClose>
          <dash-icon-button slot='dropdown-trigger' class='show-label-edit' icon='plus-circle' scale='l'></dash-icon-button>

          <hellodash-label-select
            labels={labels}
            allLabels={this.allLabels}
            canCreateLabel={!this.createLabelDisabled}
            onHellodashLabelSelectLabelAdded={e => {
              this.addLabel(e.detail.id);
            }}
            onHellodashLabelSelectLabelRemoved={e => {
              this.removeLabel(e.detail.id);
            }}
            onHellodashLabelSelectLabelCreated={e => this.createLabel(e.detail)}
            onHellodashLabelSelectLabelUpdated={e => this.updateLabel(e.detail)}
          ></hellodash-label-select>
        </dash-dropdown>

        {this.mobileView && (
          <dash-button class='edit-note-btn' slot='footer-end' scale='l' onClick={() => (this.disableReadonly = !this.disableReadonly)}>
            {this.disableReadonly ? 'View' : 'Edit'}
          </dash-button>
        )}
      </dash-modal>
    );
  }
}
