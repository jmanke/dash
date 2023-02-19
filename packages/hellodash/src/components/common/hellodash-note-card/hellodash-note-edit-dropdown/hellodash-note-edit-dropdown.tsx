import { DashDropdownCustomEvent } from '@didyoumeantoast/dash-components/dist/types/components';
import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { Label } from '../../../../models/label';
import { Note } from '../../../../models/note';
import { noteLabels } from '../../../../utils/note-labels';

type MENU_PANEL = 'default' | 'addLabel';

@Component({
  tag: 'hellodash-note-edit-dropdown',
  styleUrl: 'hellodash-note-edit-dropdown.css',
  shadow: true,
})
export class HellodashNoteEditDropdown {
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

  @State()
  creatingLabel = false;

  @State()
  noteLabels: Label[];
  //#endregion

  //#region @Prop
  @Prop()
  note: Note;
  @Watch('note')
  noteChanged(note: Note) {
    this.noteLabels = noteLabels(note, this.allLabels);
  }

  @Prop()
  allLabels: Label[];
  @Watch('allLabels')
  allLabelsChanged(allLabels: Label[]) {
    this.noteLabels = noteLabels(this.note, allLabels);
  }

  //#endregion

  //#region @Event
  @Event({
    eventName: 'hellodashNoteEditDropdownVisibleChanged',
  })
  dropdownVisibleChanged: EventEmitter<boolean>;

  @Event({
    eventName: 'hellodashNoteEditDuplicateNote',
  })
  noteDuplicated: EventEmitter<Note>;

  @Event({
    eventName: 'hellodashNoteEditDeleteNote',
  })
  noteDeleted: EventEmitter<Note>;

  @Event({
    eventName: 'hellodashNoteEditLabelAdded',
  })
  labelAdded: EventEmitter<number>;

  @Event({
    eventName: 'hellodashNoteEditLabelRemoved',
  })
  labelRemoved: EventEmitter<number>;

  @Event({
    eventName: 'hellodashNoteEditLabelCreated',
  })
  labelCreated: EventEmitter<Label>;

  @Event({
    eventName: 'hellodashNoteEditLabelUpdated',
  })
  labelUpdated: EventEmitter<Label>;

  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.noteLabels = noteLabels(this.note, this.allLabels);
  }

  //#endregion

  //#region Listeners
  handleDropdownVisibleChanged(e: DashDropdownCustomEvent<void>) {
    const open = e.target.open;
    this.dropdownVisible = open;

    if (!open) {
      this.dropdownMenuPanel = 'default';
    }

    this.dropdownVisibleChanged.emit(open);
  }
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  addLabel(id: number) {
    this.labelAdded.emit(id);
  }

  removeLabel(id: number) {
    this.labelRemoved.emit(id);
  }

  async createLabel(label: Label) {
    this.labelCreated.emit(label);
  }

  updateLabel(label: Label) {
    this.labelUpdated.emit(label);
  }

  async duplicateNote() {
    this.noteDuplicated.emit(this.note);
    this.dropdown.close();
  }

  deleteNote() {
    this.noteDeleted.emit(this.note);
  }
  //#endregion

  render() {
    return (
      <dash-dropdown ref={element => (this.dropdown = element)} placement='bottom-end' autoClose onDashDropdownOpenChange={this.handleDropdownVisibleChanged.bind(this)}>
        <dash-icon-button slot='dropdown-trigger' class='options-button' icon='three-dots-vertical' scale='l'></dash-icon-button>

        <dash-list class={this.dropdownMenuPanel !== 'default' ? 'invisible' : ''} selectionMode='none'>
          <dash-list-item onDashListItemSelectedChanged={() => (this.dropdownMenuPanel = 'addLabel')}>Add label</dash-list-item>
          <dash-list-item onDashListItemSelectedChanged={this.duplicateNote.bind(this)}>Duplicate</dash-list-item>
          <dash-list-item onDashListItemSelectedChanged={this.deleteNote.bind(this)}>Delete</dash-list-item>
        </dash-list>

        <hellodash-label-select
          class={this.dropdownMenuPanel !== 'addLabel' ? 'invisible' : ''}
          labels={this.noteLabels}
          allLabels={this.allLabels}
          canCreateLabel={!this.creatingLabel}
          onHellodashLabelSelectLabelAdded={e => this.addLabel(e.detail.id)}
          onHellodashLabelSelectLabelRemoved={e => this.removeLabel(e.detail.id)}
          onHellodashLabelSelectLabelCreated={e => this.createLabel(e.detail)}
          onHellodashLabelSelectLabelUpdated={e => this.updateLabel(e.detail)}
          autoFocus
        ></hellodash-label-select>
      </dash-dropdown>
    );
  }
}
