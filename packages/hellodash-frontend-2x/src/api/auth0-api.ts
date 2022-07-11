import appState from '../stores/app-state';

export async function refreshAuthToken() {
  try {
    await appState.authClient?.getTokenSilently({ ignoreCache: true });
  } catch (err) {
    console.error(err);
  }
}
