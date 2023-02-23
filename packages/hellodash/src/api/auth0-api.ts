import { Auth0Client } from '@auth0/auth0-spa-js';
import { logout } from '../utils/logout';

/**
 * Refreshes the auth token
 * @param authClient The auth client
 * @returns The auth token
 */
export async function refreshAuthToken(authClient: Auth0Client) {
  try {
    return authClient?.getTokenSilently({ ignoreCache: true });
  } catch (err) {
    console.error(err);
    logout(authClient);
  }
}
