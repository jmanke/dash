import { Auth0Client } from '@auth0/auth0-spa-js';
import { Component, Host, h, State, Prop, Watch } from '@stencil/core';
import { User } from '../../../models/user';
import { UserViewModel } from '../../../view-models/user-view-model';
import { appState } from '../../../stores/app-state';
import { refreshAuthToken } from '../../../api/auth0-api';
import { wait } from 'didyoumeantoast-dash-utils';

const REFRESH_TOKEN_TIMEOUT = 60 * 60 * 1000;

@Component({
  tag: 'dash-auth0-provider',
  styleUrl: 'dash-auth0-provider.css',
  shadow: true,
})
export class DashAuth0Provider {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  isAuthenticated: boolean;
  //#endregion

  //#region @Prop
  @Prop()
  authClient: Auth0Client;
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
    await refreshAuthToken();

    this.refreshAuthToken();
  }

  async userSignedIn() {
    const auth0User = await this.authClient.getUser();
    const user = new User();
    user.givenName = auth0User.given_name;
    user.familyName = auth0User.family_name;
    user.picture = auth0User.picture;
    user.email = auth0User.email;
    user.userId = auth0User.sub;
    appState.currentUser = new UserViewModel(user);

    this.refreshAuthToken();
  }
  //#endregion

  render() {
    const content = this.isAuthenticated && appState.currentUser ? <slot></slot> : undefined;

    return <Host>{content}</Host>;
  }
}
