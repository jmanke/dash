import { createStore } from '@stencil/store';
import { without } from 'lodash';
import { createNote, deleteNote, fetchNote, fetchNotePreviews, updateNote, updateNotePreview } from '../api/note-api';
import { Status } from '../enums/status';
import { EventEmitter } from '@didyoumeantoast/dash-utils';
import { Note } from '../models/note';
import { replaceAt } from '@didyoumeantoast/dash-utils';
import { NoteViewModel } from '../view-models/note-view-model';
import labelsState from './labels-store';
import { NotePreviewViewModel } from '../view-models/note-preview-view-model';
import { NotePreview } from '../models/note-preview';

interface INotesState {
  notePreviews?: NotePreviewViewModel[];
}

// create a wrapper class around the state and add get, replace, delete, add methods
class NotesState {
  private state: INotesState;
  private eventEmitter: EventEmitter = new EventEmitter();

  constructor() {
    const { state, onChange } = createStore<INotesState>({
      notePreviews: undefined,
    });
    this.state = state;
    onChange('notePreviews', () => {
      this.eventEmitter.emit('notesChanged');
    });

    labelsState.addLabelsChangedListener((labels, prevLabels) => {
      if (labels?.length >= prevLabels?.length) {
        return;
      }

      const labelsMap = new Map<number, number>();
      labels.forEach(label => labelsMap.set(label.id, label.id));

      this.notePreviews.forEach(notePreview => {
        const isDirty = notePreview.__isDirty;
        const labelsToRemove = [];

        notePreview.labels.forEach(labelId => {
          if (!labelsMap.get(labelId)) {
            labelsToRemove.push(labelId);
          }
        });

        if (labelsToRemove.length) {
          notePreview.labels = without(notePreview.labels, ...labelsToRemove);
        }

        // shouldn't modify is note is dirty, labelsState will handle removing labels on notes in backend
        notePreview.__isDirty = isDirty;
      });
    });
  }

  async init() {
    const notePreviews = (await fetchNotePreviews()) ?? [];
    this.state.notePreviews = notePreviews.map(notePreview => new NotePreviewViewModel(notePreview));
  }

  get notePreviews() {
    return this.state.notePreviews?.filter(notePreview => notePreview.status === Status.Active) ?? [];
  }

  get archivedNotePreviews() {
    return this.state.notePreviews?.filter(notePreview => notePreview.status === Status.Archived) ?? [];
  }

  async updateNote(note: NoteViewModel) {
    if (!this.state.notePreviews || !note.__isDirty) {
      return;
    }
    const notePreview = new NotePreviewViewModel({ ...note.__toModel() });

    // replace the note with the same id
    this.state.notePreviews = replaceAt(this.state.notePreviews, n => n.id === note.id, notePreview);
    // sync with server
    // TODO: if update fails, revert back to previous note
    const resp = await updateNote(note.__toModel());
    note.__isDirty = false;
    return resp;
  }

  async updateNotePreview(notePreview: NotePreviewViewModel) {
    if (!this.state.notePreviews || !notePreview.__isDirty) {
      return;
    }

    // replace the note with the same id
    this.state.notePreviews = replaceAt(this.state.notePreviews, n => n.id === notePreview.id, notePreview);
    // sync with server
    // TODO: if update fails, revert back to previous note
    const resp = await updateNotePreview(notePreview.__toModel());
    notePreview.__isDirty = false;
    return resp;
  }

  async archiveNote(note: NotePreviewViewModel | NoteViewModel) {
    note.status = Status.Archived;
    // sync with server
    // TODO: if update fails, revert back to previous state
    return this.updateNotePreview(note);
  }

  async restoreNote(note: NotePreviewViewModel | NoteViewModel) {
    note.status = Status.Active;
    // sync with server
    // TODO: if update fails, revert back to previous state
    return this.updateNotePreview(note);
  }

  async deleteNote(note: NotePreviewViewModel | NoteViewModel) {
    this.state.notePreviews = without(this.state.notePreviews, note);
    // sync with server
    // TODO: if update fails, revert back to previous state
    return deleteNote(note.__toModel());
  }

  async addNote(note: Note | NotePreview) {
    const noteId = (await createNote(note)) as number;
    const newNote = await fetchNote(noteId);
    // sync with server
    // TODO: if update fails, revert back to previous state
    this.state.notePreviews = [new NotePreviewViewModel(newNote), ...this.state.notePreviews];

    return newNote;
  }

  async duplicateNote(notePreview: NotePreviewViewModel) {
    const noteModel = await fetchNote(notePreview.id);
    noteModel.title += ' (copy)';
    const noteId = (await createNote(noteModel)) as number;
    const newNote = await fetchNote(noteId);
    // sync with server
    // TODO: if update fails, revert back to previous state
    this.state.notePreviews = [new NotePreviewViewModel(newNote), ...this.state.notePreviews];

    return newNote;
  }

  addNotesChangedListener(callbackFn: () => void) {
    this.eventEmitter.on('notesChanged', callbackFn);
  }

  removeNotesChangedListener(callbackFn: () => void) {
    this.eventEmitter.removeListener('notesChanged', callbackFn);
  }
}

const notesState = new NotesState();

export default notesState;
