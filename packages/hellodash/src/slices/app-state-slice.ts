import { AppState, User } from '@didyoumeantoast/hellodash-models';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AppState = {
  loaded: false,
  mobileView: false,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setMobileView: (state, action: PayloadAction<boolean>) => {
      state.mobileView = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, setLoaded, setMobileView, setError } = appStateSlice.actions;
