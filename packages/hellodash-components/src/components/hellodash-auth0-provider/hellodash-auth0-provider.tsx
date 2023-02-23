import { Auth0Client } from '@auth0/auth0-spa-js';
import { wait } from '@didyoumeantoast/dash-utils';
import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';

const REFRESH_TOKEN_TIMEOUT = 60 * 60 * 1000;

@Component({
  tag: 'hellodash-auth0-provider',
  styleUrl: 'hellodash-auth0-provider.css',
  shadow: true,
})
export class HellodashAuth0Provider {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State

  @State() isAuthenticated: boolean;

  //#endregion

  //#region @Prop

  @Prop() authClient: Auth0Client;
  @Watch('authClient')
  async handleAuthentication() {
    if (!this.authClient) {
      return;
    }

    this.isAuthenticated = await this.authClient.isAuthenticated();

    const query = window.location.search;

    if (this.isAuthenticated) {
      this.userSignedIn();
    }
    // check query to see if we're at the redirect callback stage from auth0
    else if (!this.isAuthenticated && query.includes('code=') && query.includes('state=')) {
      // Process the login state
      await this.authClient.handleRedirectCallback();

      // clear any query params leftover from auth0 authentication process
      window.history.replaceState({}, document.title, '/');

      // at this point, user should be authenticated
      this.isAuthenticated = await this.authClient.isAuthenticated();

      if (this.isAuthenticated) {
        this.userSignedIn();
      }
    } else {
      this.login();
    }
  }
  //#endregion

  //#region @Event

  @Event({ eventName: 'hellodashAuth0ProviderSignedIn' }) signedIn: EventEmitter<void>;

  @Event({ eventName: 'hellodashAuth0ProviderRefreshToken' }) refreshToken: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.handleAuthentication();
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  async login() {
    if (this.isAuthenticated) {
      return;
    }

    await this.authClient.loginWithRedirect({
      redirect_uri: window.location.origin,
    });
  }

  async refreshAuthToken() {
    await wait(REFRESH_TOKEN_TIMEOUT);
    this.refreshToken.emit();

    this.refreshAuthToken();
  }

  async userSignedIn() {
    this.signedIn.emit();
    this.refreshAuthToken();
  }

  //#endregion

  render() {
    const content = this.isAuthenticated ? <slot></slot> : undefined;

    return <Host>{content}</Host>;
  }
}
