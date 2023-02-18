import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Label } from '../models/label';
import { fetchLabel, fetchLabels, createLabel as createLabelApi, updateLabel as updateLabelApi, deleteLabel as deleteLabelApi } from '../api/labels-api';

export const getLabels = createAsyncThunk('labels/fetchLabels', async (_, { dispatch }) => {
  const labels = (await fetchLabels()) ?? [];
  dispatch(setLabels(labels));

  return labels;
});

export const getLabelById = createAsyncThunk('labels/fetchLabel', async (id: number, { dispatch }) => {
  const label = await fetchLabel(id);
  dispatch(replaceLabel(label));

  return label;
});

export const createLabel = createAsyncThunk('labels/createLabel', async (label: Label, { dispatch }) => {
  const id = await createLabelApi(label);
  const newLabel = {
    ...label,
    id,
  };
  dispatch(addLabel(newLabel));

  return label;
});

export const updateLabel = createAsyncThunk('labels/updateLabel', async (label: Label, { dispatch }) => {
  dispatch(replaceLabel(label));
  await updateLabelApi(label);

  return label;
});

export const deleteLabel = createAsyncThunk('notes/deleteLabel', async (label: Label, { dispatch }) => {
  dispatch(removeLabel(label));

  return deleteLabelApi(label);
});

const initialState: Label[] | null = null;

export const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    setLabels: (state, action: PayloadAction<Label[]>) => {
      state = action.payload;
      return state;
    },
    addLabel: (state, action: PayloadAction<Label>) => {
      state.push(action.payload);
    },
    replaceLabel: (state, action: PayloadAction<Label>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      state.splice(index, 1, action.payload);
    },
    removeLabel: (state, action: PayloadAction<Label>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
const { setLabels, addLabel, replaceLabel, removeLabel } = labelsSlice.actions;
