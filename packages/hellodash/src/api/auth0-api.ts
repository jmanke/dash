import { Auth0Client } from '@auth0/auth0-spa-js';
import { logout } from '../utils/logout';

export async function refreshAuthToken(authClient: Auth0Client) {
  try {
    return authClient?.getTokenSilently({ ignoreCache: true });
  } catch (err) {
    console.error(err);
    logout(authClient);
  }
}
