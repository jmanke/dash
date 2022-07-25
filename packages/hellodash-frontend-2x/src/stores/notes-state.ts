import { createStore } from '@stencil/store';
import { without } from 'lodash';
import { createNote, deleteNote, fetchNote, fetchNotes, updateNote, updateNotePreview } from '../api/note-api';
import { Status } from '../enums/status';
import EventEmitter from '../lib/event-emitter';
import { Note } from '../models/note';
import { replaceAt } from 'didyoumeantoast-dash-utils';
import { NoteViewModel } from '../view-models/note-view-model';
import labelsState from './labels-store';

interface INotesState {
  notes?: NoteViewModel[];
}

// create a wrapper class around the state and add get, replace, delete, add methods
class NotesState {
  private state: INotesState;
  private eventEmitter: EventEmitter = new EventEmitter();

  constructor() {
    const { state, onChange } = createStore<INotesState>({
      notes: undefined,
    });
    this.state = state;
    onChange('notes', () => {
      // this.notes = notes?.filter(note => note.status === Status.Active) ?? [];
      // this.archivedNotes = notes?.filter(note => note.status === Status.Archived) ?? [];
      this.eventEmitter.emit('notesChanged');
    });

    labelsState.addLabelsChangedListener((labels, prevLabels) => {
      if (labels?.length >= prevLabels?.length) {
        return;
      }

      const labelsMap = new Map<number, number>();
      labels.forEach(label => labelsMap.set(label.id, label.id));

      this.notes.forEach(note => {
        const isDirty = note.__isDirty;
        const labelsToRemove = [];

        note.labels.forEach(labelId => {
          if (!labelsMap.get(labelId)) {
            labelsToRemove.push(labelId);
          }
        });

        if (labelsToRemove.length) {
          note.labels = without(note.labels, ...labelsToRemove);
        }

        // shouldn't modify is note is dirty, labelsState will handle removing labels on notes in backend
        note.__isDirty = isDirty;
      });
    });
  }

  async init() {
    const notes = (await fetchNotes()) ?? [];
    this.state.notes = notes.map(note => new NoteViewModel(note));
  }

  // @tracked notes: NoteViewModel[] = [];
  // @tracked archivedNotes: NoteViewModel[] = [];

  get notes() {
    return this.state.notes?.filter(note => note.status === Status.Active) ?? [];
  }

  get archivedNotes() {
    return this.state.notes?.filter(note => note.status === Status.Archived) ?? [];
  }

  async updateNote(note: NoteViewModel) {
    if (!this.state.notes || !note.__isDirty) {
      return;
    }
    const noteWithoutContent = new NoteViewModel({ ...note.__toModel(), content: undefined });

    // replace the note with the same id
    this.state.notes = replaceAt(this.state.notes, n => n.id === note.id, noteWithoutContent);
    // sync with server
    // TODO: if update fails, revert back to previous note
    const resp = await updateNote(note.__toModel());
    note.__isDirty = false;
    return resp;
  }

  async updateNotePreview(note: NoteViewModel) {
    if (!this.state.notes || !note.__isDirty) {
      return;
    }

    // replace the note with the same id
    this.state.notes = replaceAt(this.state.notes, n => n.id === note.id, note);
    // sync with server
    // TODO: if update fails, revert back to previous note
    const resp = await updateNotePreview(note.__toModel());
    note.__isDirty = false;
    return resp;
  }

  async archiveNote(note: NoteViewModel) {
    note.status = Status.Archived;
    // sync with server
    // TODO: if update fails, revert back to previous state
    return this.updateNotePreview(note);
  }

  async restoreNote(note: NoteViewModel) {
    note.status = Status.Active;
    // sync with server
    // TODO: if update fails, revert back to previous state
    return this.updateNotePreview(note);
  }

  async deleteNote(note: NoteViewModel) {
    this.state.notes = without(this.state.notes, note);
    // sync with server
    // TODO: if update fails, revert back to previous state
    return deleteNote(note.__toModel());
  }

  async addNote(note: Note) {
    const noteId = (await createNote(note)) as number;
    const newNote = await fetchNote(noteId);
    // sync with server
    // TODO: if update fails, revert back to previous state
    this.state.notes = [new NoteViewModel(newNote), ...this.state.notes];

    return newNote;
  }

  async duplicateNote(note: NoteViewModel) {
    const noteModel = note.__toModel();
    noteModel.title += ' (copy)';
    const noteId = (await createNote(noteModel)) as number;
    const newNote = await fetchNote(noteId);
    // sync with server
    // TODO: if update fails, revert back to previous state
    this.state.notes = [new NoteViewModel(newNote), ...this.state.notes];

    return newNote;
  }

  addNotesChangedListener(callbackFn: () => any) {
    this.eventEmitter.on('notesChanged', callbackFn);
  }

  removeNotesChangedListener(callbackFn: () => any) {
    this.eventEmitter.removeListener('notesChanged', callbackFn);
  }
}

const notesState = new NotesState();

export default notesState;
