import { configureStore } from '@reduxjs/toolkit';
import { appSettingsSlice } from './slices/app-settings-slice';
import { appStateSlice } from './slices/app-state-slice';
import { labelsSlice } from './slices/labels-slice';
import { notesSlice } from './slices/notes-slice';

/**
 * The store is the object that brings actions and reducers together.
 */
export const store = configureStore({
  reducer: {
    [notesSlice.name]: notesSlice.reducer,
    [labelsSlice.name]: labelsSlice.reducer,
    [appSettingsSlice.name]: appSettingsSlice.reducer,
    [appStateSlice.name]: appStateSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;
