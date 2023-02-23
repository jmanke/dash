import { Auth0Client } from '@auth0/auth0-spa-js';

/**
 * Logs out the user
 * @param authClient The auth client
 */
export function logout(authClient: Auth0Client) {
  authClient.logout({ returnTo: window.location.origin });
}
