import { AppSettingsViewModel } from '../view-models/app-settings-view-model';
import { UserViewModel } from '../view-models/user-view-model';
import { createStore } from '@stencil/store';
import { Auth0Client } from '@auth0/auth0-spa-js';

interface AppState {
  settings?: AppSettingsViewModel;
  currentUser?: UserViewModel;
  authClient?: Auth0Client;
  loaded: boolean;
  error?: any;
  mobileView: boolean;
}

const { state, onChange } = createStore<AppState>({
  loaded: false,
  mobileView: false,
});
const appState = state;

export default appState;
export { appState, onChange as onAppChange };
