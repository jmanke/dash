import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../models/note';

const initialState: Note[] = [];

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    replaceNote: (state, action: PayloadAction<Note>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      state.splice(index, 1, action.payload);
    },
    removeNote: (state, action: PayloadAction<Note>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotes, addNote, replaceNote, removeNote } = notesSlice.actions;
