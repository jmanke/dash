import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../models/note';
import { fetchNote, fetchNotePreviews, updateNote as updateNoteApi, deleteNote as deleteNoteApi, createNote as createNoteApi } from '../api/note-api';
import { Status } from '../enums/status';
import { store } from '../store';

export const getNotePreviews = createAsyncThunk('notes/fetchNotePreviews', async (_, { dispatch }) => {
  const notes = (await fetchNotePreviews()) ?? [];
  dispatch(setNotes(notes));

  return notes;
});

export const getNoteById = createAsyncThunk('notes/fetchNotePreviews', async (id: number, { dispatch }) => {
  const note = await fetchNote(id);
  dispatch(replaceNote(note));

  return note;
});

export const createNote = createAsyncThunk('labels/createNote', async (note: Note, { dispatch }) => {
  const id = await createNoteApi(note);
  const newNote = {
    ...note,
    id,
  };
  dispatch(addNote(newNote));

  return note;
});

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

export const deleteNote = createAsyncThunk('notes/deleteNote', async (note: Note, { dispatch }) => {
  dispatch(removeNote(note));

  return deleteNoteApi(note);
});

export const duplicateNote = createAsyncThunk('notes/duplicateNote', async (note: Note, { dispatch }) => {
  // content isn't fetched, note is a preview
  if (note.content === null) {
    note = await fetchNote(note.id);
  }

  const noteCopy = { ...note };

  noteCopy.title += ' (copy)';
  const noteCopyId = await createNoteApi(noteCopy);
  const newNote = await fetchNote(noteCopyId);

  dispatch(addNote(newNote));

  return newNote;
});

export const archiveNote = createAsyncThunk('notes/archiveNote', async (note: Note, { dispatch }) => {
  const archivedNote: Note = {
    ...note,
    status: Status.Archived,
  };
  dispatch(replaceNote(archivedNote));

  return updateNoteApi(note);
});

export const restoreNote = createAsyncThunk('notes/restoreNote', async (note: Note, { dispatch }) => {
  const archivedNote: Note = {
    ...note,
    status: Status.Active,
  };
  dispatch(replaceNote(archivedNote));

  return updateNoteApi(note);
});

export const addLabelToNote = createAsyncThunk('notes/addLabel', async ({ note, label }: { note: Note; label: number }, { dispatch }) => {
  const newNote: Note = {
    ...note,
    labels: [...note.labels, label],
  };
  dispatch(replaceNote(newNote));

  return updateNoteApi(note);
});

export const removeLabelFromNote = createAsyncThunk('notes/removeLabel', async ({ note, label }: { note: Note; label: number }, { dispatch }) => {
  const index = note.labels.findIndex(l => l === label);
  if (index === -1) {
    return;
  }

  const newNote: Note = {
    ...note,
    labels: note.labels.splice(index, 1),
  };
  dispatch(replaceNote(newNote));

  return updateNoteApi(note);
});

export function noteLabels(note: Note) {
  const labelsMap = new Map();
  store.getState().labels?.forEach(label => {
    labelsMap.set(label.id, label);
  });
  return note.labels?.map(labelId => labelsMap.get(labelId)).filter(label => !!label) ?? [];
}

const initialState: Note[] | null = null;

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
        state.push(action.payload);
        return;
      }
      state.splice(index, 1, action.payload);
    },
    removeNote: (state, action: PayloadAction<Note>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
const { setNotes, addNote, replaceNote, removeNote } = notesSlice.actions;