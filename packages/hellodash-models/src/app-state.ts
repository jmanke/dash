import { User } from './user';

export interface AppState {
  currentUser?: User;
  loaded: boolean;
  mobileView: boolean;
  error?: any;
}
