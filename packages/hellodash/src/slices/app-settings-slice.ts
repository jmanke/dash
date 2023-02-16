import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppSettings } from '../models/app-settings';
import { Theme } from '../types/types';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';

const LOCAL_STORAGE_KEY = 'hellodash-app-settings';

const savedState = getLocalStorage(LOCAL_STORAGE_KEY);
const initialState: AppSettings = savedState
  ? JSON.parse(savedState)
  : {
      theme: 'dark',
      sidebarCollapsed: true,
    };

function setDocumentTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function save(state: AppSettings) {
  setLocalStorage(LOCAL_STORAGE_KEY, JSON.stringify(state));
}

setDocumentTheme(initialState.theme);

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      document.documentElement.dataset.theme = action.payload;
      save(state);
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      save(state);
    },
    toggleSidebarCollapsed: state => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme, setSidebarCollapsed, toggleSidebarCollapsed } = appSettingsSlice.actions;
