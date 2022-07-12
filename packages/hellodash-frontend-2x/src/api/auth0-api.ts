import appState from '../stores/app-state';
import { logout } from '../utils/logout';

export async function refreshAuthToken() {
  try {
    await appState.authClient?.getTokenSilently({ ignoreCache: true });
  } catch (err) {
    console.error(err);
    logout(appState.authClient);
  }
}
