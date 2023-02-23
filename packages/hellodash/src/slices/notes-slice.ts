import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Note, Label, Status } from '@didyoumeantoast/hellodash-models';
import { fetchNote, fetchNotePreviews, updateNote as updateNoteApi, deleteNote as deleteNoteApi, createNote as createNoteApi, updateNotePreview } from '../api/note-api';

async function _updateNote(note: Note) {
  return note.content === null ? await updateNotePreview(note) : await updateNoteApi(note);
}

export const getNotePreviews = createAsyncThunk('notes/fetchNotePreviews', async (_, { dispatch }) => {
  const notes = (await fetchNotePreviews()) ?? [];
  dispatch(setNotes(notes));

  return notes;
});

export const getNoteById = createAsyncThunk('notes/fetchNotePreviews', async (id: number, { dispatch }) => {
  const note = await fetchNote(id);

  if (note) {
    dispatch(replaceNote(note));
  }

  console.log(note);

  return note;
});

export const createNote = createAsyncThunk('labels/createNote', async (note: Note, { dispatch }) => {
  const id = Math.random(); //await createNoteApi(note);
  const newNote: Note = {
    ...note,
    id,
  };
  dispatch(addNote(newNote));

  return newNote;
});

export const updateNote = createAsyncThunk('notes/updateNote', async (note: Note, { dispatch }) => {
  dispatch(replaceNote(note));

  const { lastModified } = { lastModified: new Date().toISOString() }; // await _updateNote(note);
  const updatedNote = {
    ...note,
    lastModified,
  };
  dispatch(replaceNote(updatedNote));

  return updatedNote;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (note: Note, { dispatch }) => {
  dispatch(removeNote(note));

  // return deleteNoteApi(note);
});

export const duplicateNote = createAsyncThunk('notes/duplicateNote', async (note: Note, { dispatch }) => {
  // content isn't fetched, note is a preview
  if (note.content === null) {
    note = (await fetchNote(note.id)) as Note;
  }

  const noteCopy = {
    ...note,
    title: note.title + ' (copy)',
  };

  // const noteCopyId = await createNoteApi(noteCopy);
  // const newNote = await fetchNote(noteCopyId);

  // dispatch(addNote(newNote));

  // return newNote;
});

export const archiveNote = createAsyncThunk('notes/archiveNote', async (note: Note, { dispatch }) => {
  const archivedNote: Note = {
    ...note,
    status: Status.Archived,
  };
  dispatch(replaceNote(archivedNote));

  // return _updateNote(archivedNote);
});

export const restoreNote = createAsyncThunk('notes/restoreNote', async (note: Note, { dispatch }) => {
  const archivedNote: Note = {
    ...note,
    status: Status.Active,
  };
  dispatch(replaceNote(archivedNote));

  // return _updateNote(archivedNote);
});

export const addLabelToNote = createAsyncThunk('notes/addLabel', async ({ note, label }: { note: Note; label: number }, { dispatch }) => {
  const newNote: Note = {
    ...note,
    labels: [...note.labels, label],
  };
  dispatch(replaceNote(newNote));

  // return _updateNote(newNote);
});

export const removeLabelFromNote = createAsyncThunk('notes/removeLabel', async ({ note, label }: { note: Note; label: number }, { dispatch }) => {
  const newNote: Note = {
    ...note,
    labels: note.labels.filter(l => l !== label),
  };
  dispatch(replaceNote(newNote));

  // return _updateNote(newNote);
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
