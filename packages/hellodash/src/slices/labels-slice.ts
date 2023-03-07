import { Label } from '@didyoumeantoast/hellodash-models';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';
import { createLabel as createLabelApi, deleteLabel as deleteLabelApi, fetchLabel, fetchLabels, updateLabel as updateLabelApi } from '../api/labels-api';
import { RootState } from '../store';
import { syncLabels } from './notes-slice';

/** Legacy label colors */
const Colors = {
  'red': '#af6566',
  'orange': '#af815a',
  'yellow': '#a7954e',
  'green-apple': ' #73a647',
  'green-grass': '#50a559',
  'baby-blue': '#6c91b2',
  'dark-blue': '#7379b1',
  'purple': '#906098',
  'pink': '#b0739b',
};

/**
 * Fetches all labels from the API and stores them in the store.
 */
export const getLabels = createAsyncThunk('labels/fetchLabels', async (_, { dispatch }) => {
  const labels = (await fetchLabels()) ?? [];

  labels.forEach(label => {
    // check if labels have legacy colors and convert them to the new format
    if (label.color in Colors) {
      // @ts-ignore
      label.color = Colors[label.color];
    }
  });

  const sortedLabels = sortBy(labels, 'sortOrder', 'id');

  dispatch(setLabels(sortedLabels));

  return labels;
});

/**
 * Fetches a single label from the API and stores it in the store.
 */
export const getLabelById = createAsyncThunk('labels/fetchLabel', async (id: number, { dispatch }) => {
  const label = await fetchLabel(id);

  if (label) {
    if (label.color in Colors) {
      // @ts-ignore
      label.color = Colors[label.color];
    }

    dispatch(replaceLabel(label));
  }

  return label;
});

/**
 * Creates a new label and stores it in the store.
 */
export const createLabel = createAsyncThunk('labels/createLabel', async (label: Pick<Label, 'color' | 'text'>, { dispatch, getState }) => {
  const labels = (getState() as RootState).labels;
  // sort order is the last label's sort order + 1
  const lastLabel = labels[labels.length - 1];
  // if there are no labels, the sort order is 0
  const sortOrder = lastLabel ? lastLabel.sortOrder + 1 : 0;

  const sortedLabel = {
    ...label,
    sortOrder,
  } as Label;
  const id = await createLabelApi(sortedLabel);
  const newLabel = (await fetchLabel(id)) as Label;

  if (newLabel) {
    dispatch(addLabel(newLabel));
  }

  return newLabel;
});

/**
 * Updates a label and stores it in the store.
 */
export const updateLabel = createAsyncThunk('labels/updateLabel', async (label: Label, { dispatch }) => {
  dispatch(replaceLabel(label));
  await updateLabelApi(label);

  return label;
});

/**
 * Reorders labels and stores it in the store.
 * @param labels Labels that will replace the current labels with the new sort order
 */
export const reorderLabels = createAsyncThunk('labels/updateLabels', async (labels: Label[] = [], { dispatch }) => {
  let labelsToUpdate: Label[] = [];
  const sortedLabels = labels.map((label, index) => {
    // update any labels with a different sort order
    const sortedLabel = {
      ...label,
      sortOrder: index,
    };

    // only need to update the label in API if the sort order has changed
    if (label.sortOrder !== index) {
      labelsToUpdate.push(sortedLabel);
    }

    return sortedLabel;
  });

  dispatch(setLabels(sortedLabels));

  const updatePromises = labelsToUpdate.map(label => updateLabelApi(label));
  await Promise.all(updatePromises);

  return sortedLabels;
});

/**
 * Deletes a label and removes it from the store.
 */
export const deleteLabel = createAsyncThunk('notes/deleteLabel', async (label: Label, { dispatch, getState }) => {
  dispatch(removeLabel(label));

  // after a label is deleted, we need to update the notes that had that label
  dispatch(syncLabels((getState() as RootState).labels));

  return deleteLabelApi(label);
});

const initialState: Label[] = [];

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
