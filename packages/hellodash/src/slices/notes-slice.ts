import { Label, Note, Status } from '@didyoumeantoast/hellodash-models';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNote as createNoteApi, deleteNote as deleteNoteApi, fetchNote, fetchNotePreviews, updateNote as updateNoteApi } from '../api/notes-api';

/**
 * Fetches all notes (without content) from the API and stores them in the store.
 */
export const getNotePreviews = createAsyncThunk('notes/fetchNotePreviews', async (_, { dispatch }) => {
  const notes = (await fetchNotePreviews()) ?? [];
  dispatch(setNotes(notes));

  return notes;
});

/**
 * Fetches a single note from the API and stores it in the store.
 */
export const getNoteById = createAsyncThunk('notes/fetchNotePreviews', async (id: number, { dispatch }) => {
  const note = await fetchNote(id);

  if (note) {
    dispatch(replaceNote(note));
  }

  return note;
});

/**
 * Creates a new note and stores it in the store.
 */
export const createNote = createAsyncThunk('labels/createNote', async (note: Pick<Note, 'title' | 'labels' | 'status' | 'content' | 'previewContent'>, { dispatch }) => {
  const id = await createNoteApi(note as Note);
  const newNote = await fetchNote(id);

  if (newNote) {
    dispatch(addNote(newNote));
  }

  return newNote;
});

/**
 * Updates a note and stores it in the store.
 */
export const updateNote = createAsyncThunk('notes/updateNote', async (note: Note, { dispatch }) => {
  dispatch(replaceNote(note));

  const { lastModified } = await updateNoteApi(note);
  const updatedNote = {
    ...note,
    lastModified,
  };
  dispatch(replaceNote(updatedNote));

  return updatedNote;
});

/**
 * Deletes a note and removes it from the store.
 */
export const deleteNote = createAsyncThunk('notes/deleteNote', async (note: Note, { dispatch }) => {
  dispatch(removeNote(note));

  return deleteNoteApi(note);
});

/**
 * Duplicates a note and stores it in the store.
 */
export const duplicateNote = createAsyncThunk('notes/duplicateNote', async (note: Note, { dispatch }) => {
  // content isn't fetched, note is a preview
  if (note.content === null) {
    note = (await fetchNote(note.id)) as Note;
  }

  const noteCopy = {
    ...note,
    title: note.title + ' (copy)',
  };

  const noteCopyId = await createNoteApi(noteCopy);
  const newNote = await fetchNote(noteCopyId);

  if (newNote) {
    dispatch(addNote(newNote));
  }

  return newNote;
});

/**
 * Archives a note and stores it in the store.
 */
export const archiveNote = createAsyncThunk('notes/archiveNote', async (note: Note, { dispatch }) => {
  const archivedNote: Note = {
    ...note,
    status: Status.Archived,
  };
  dispatch(replaceNote(archivedNote));

  return updateNoteApi(archivedNote);
});

/**
 * Restores a note and stores it in the store.
 */
export const restoreNote = createAsyncThunk('notes/restoreNote', async (note: Note, { dispatch }) => {
  const archivedNote: Note = {
    ...note,
    status: Status.Active,
  };
  dispatch(replaceNote(archivedNote));

  return updateNoteApi(archivedNote);
});

/**
 * Adds a label to a note and stores it in the store.
 */
export const addLabelToNote = createAsyncThunk('notes/addLabel', async ({ note, label }: { note: Note; label: number }, { dispatch }) => {
  const newNote: Note = {
    ...note,
    labels: [...note.labels, label],
  };
  dispatch(replaceNote(newNote));

  return updateNoteApi(newNote);
});

/**
 * Removes a label from a note and stores it in the store.
 */
export const removeLabelFromNote = createAsyncThunk('notes/removeLabel', async ({ note, label }: { note: Note; label: number }, { dispatch }) => {
  const newNote: Note = {
    ...note,
    labels: note.labels.filter(l => l !== label),
  };
  dispatch(replaceNote(newNote));

  return updateNoteApi(newNote);
});

const initialState: Note[] = [];

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state = action.payload;

      return state;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    replaceNote: (state, action: PayloadAction<Note>) => {
      const index = state.findIndex(note => action.payload.id === note.id);
      if (index === -1) {
        return;
      }

      state.splice(index, 1, action.payload);
    },
    removeNote: (state, action: PayloadAction<Note>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      state.splice(index, 1);
    },
    syncLabels: (state, action: PayloadAction<Label[]>) => {
      const labels = new Set(action.payload.map(label => label.id));
      state.forEach(note => (note.labels = note.labels.filter(label => labels.has(label))));
    },
  },
});

// Action creators are generated for each case reducer function
const { setNotes, addNote, replaceNote, removeNote } = notesSlice.actions;
export const { syncLabels } = notesSlice.actions;
