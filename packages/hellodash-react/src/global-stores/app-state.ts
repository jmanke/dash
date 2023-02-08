import { AppSettingsViewModel } from '../view-models/app-settings-view-model';
import UserViewModel from '../view-models/user-view-model';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { makeAutoObservable } from 'mobx';

class AppState {
  settings?: AppSettingsViewModel;
  currentUser?: UserViewModel;
  authClient?: Auth0Client;
  loaded: boolean;
  error?: any;
  mobileView: boolean;

  constructor() {
    this.loaded = false;
    this.mobileView = false;

    makeAutoObservable(this);
  }
}

export default new AppState();
