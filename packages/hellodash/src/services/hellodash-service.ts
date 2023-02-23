import { Auth0Client } from '@auth0/auth0-spa-js';

/**
 * Holds global state of instance properties for Hellodash.
 * The Redux store doesn't like instances, so anything that can't go in Redux but needs to be accessed globally can go in this service.
 * This is a singleton class.
 */
class HellodashService {
  /**
   * The Auth0 client instance
   */
  authClient!: Auth0Client;
}

export const hellodashService = new HellodashService();
