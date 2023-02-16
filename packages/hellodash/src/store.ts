import { configureStore } from '@reduxjs/toolkit';
import { labelsSlice } from './slices/labels-slice';
import { appSettingsSlice } from './slices/app-settings-slice';
import { appStateSlice } from './slices/app-state-slice';
import { notesSlice } from './slices/notes-slice';
import { apiSlice } from './slices/api-slice';

export const store = configureStore({
  reducer: {
    [notesSlice.name]: notesSlice.reducer,
    [labelsSlice.name]: labelsSlice.reducer,
    [appSettingsSlice.name]: appSettingsSlice.reducer,
    [appStateSlice.name]: appStateSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;
