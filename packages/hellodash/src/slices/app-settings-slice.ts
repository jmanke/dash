import { AppSettings, Theme } from '@didyoumeantoast/hellodash-models';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';

/** Root local storage key for Hellodash */
const LOCAL_STORAGE_KEY = 'hellodash-app-settings';

// Initial state is loaded from local storage
const savedState = getLocalStorage(LOCAL_STORAGE_KEY);
const initialState: AppSettings = savedState
  ? JSON.parse(savedState)
  : {
      theme: 'dark',
      sidebarCollapsed: true,
    };

/**
 * Sets the theme on the document element
 * @param theme The theme to set
 */
function setDocumentTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

/**
 * Saves the state to local storage
 * @param state The state to save
 */
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
      save(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme, setSidebarCollapsed, toggleSidebarCollapsed } = appSettingsSlice.actions;
