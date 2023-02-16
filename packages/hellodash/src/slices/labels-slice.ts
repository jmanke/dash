import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Label } from '../models/label';
import { createNote } from './api-slice';

const initialState: Label[] = [];

export const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    setLabels: (state, action: PayloadAction<Label[]>) => {
      state = action.payload;
    },
    create: (state, action: PayloadAction<Label>) => {
      state.push(action.payload);
    },
    update: (state, action: PayloadAction<Label>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      state.splice(index, 1, action.payload);
    },
    remove: (state, action: PayloadAction<Label>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      state.splice(index, 1);
    },
  },
  extraReducers: builder => {
    builder.addCase(createNote., (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setLabels, create, update, remove } = labelsSlice.actions;
