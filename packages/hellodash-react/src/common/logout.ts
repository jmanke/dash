import { Auth0Client } from '@auth0/auth0-spa-js';

export function logout(authClient?: Auth0Client) {
  if (!authClient) {
    return;
  }

  authClient.logout({ returnTo: window.location.origin });
}
