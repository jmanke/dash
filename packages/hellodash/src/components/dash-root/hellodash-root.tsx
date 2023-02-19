import createAuth0Client from '@auth0/auth0-spa-js';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil-community/router';
import { CONSTANTS } from '../../constants';
import { dashRootService } from './dash-root-service';
import { User } from '../../models/user';
import { dispatch, RootState, store } from '../../store';
import { setCurrentUser, setMobileView } from '../../slices/app-state-slice';

@Component({
  tag: 'hellodash-root',
  styleUrl: 'hellodash-root.css',
})
export class HellodashRoot {
  //#region Own properties
  windowResizeCallback: (e: UIEvent) => void;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLElement;
  //#endregion

  //#region @State
  @State()
  rootState: RootState;

  @State()
  isMenuVisible = false;

  @State()
  appStateLoaded: boolean;

  @State()
  appElementReady: boolean;
  //#endregion

  //#region @Prop
  @Prop({
    mutable: true,
  })
  history: RouterHistory;
  @Watch('history')
  historyChanged(history: RouterHistory) {
    if (!history) {
      return;
    }

    dashRootService.initHistory(history);
  }
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  async componentWillLoad() {
    const authClient = await createAuth0Client({
      domain: CONSTANTS.AUTH0_DOMAIN,
      client_id: CONSTANTS.AUTH0_CLIENTID,
      audience: CONSTANTS.AUTH0_AUDIENCE,
      useRefreshTokens: true,
    });
    dashRootService.authClient = authClient;

    if (!this.rootState) {
      this.rootState = store.getState();
    }
    store.subscribe(() => {
      this.rootState = store.getState();
    });

    this.appStateLoaded = true;
  }

  setMobileView() {
    const mobileView = this.rootState.appState.mobileView;
    if ((document.body.clientWidth < 600 && !mobileView) || (document.body.clientWidth >= 600 && mobileView)) {
      dispatch(setMobileView(!mobileView));
    }
  }

  connectedCallback() {
    if (!this.rootState) {
      this.rootState = store.getState();
    }

    this.windowResizeCallback = () => {
      this.setMobileView();
    };
    window.addEventListener('resize', this.windowResizeCallback);

    this.setMobileView();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.windowResizeCallback);
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  async appElementConnected(e: HTMLHellodashAppElement) {
    await e.componentOnReady();

    this.appElementReady = true;
  }

  async userSignedIn() {
    const auth0User = await dashRootService.authClient.getUser();
    const user: User = {
      id: 0,
      givenName: auth0User.given_name,
      familyName: auth0User.family_name,
      picture: auth0User.picture,
      email: auth0User.email,
      userId: auth0User.sub,
    };
    dispatch(setCurrentUser(user));
  }
  //#endregion

  render() {
    const { error, currentUser } = this.rootState.appState;
    const { authClient } = dashRootService;
    const loading = !this.appStateLoaded || !this.appElementReady;

    return (
      <Host>
        {this.appStateLoaded && (
          <hellodash-auth0-provider authClient={authClient} onHellodashAuth0ProviderSignedIn={this.userSignedIn.bind(this)}>
            {!error && currentUser && <hellodash-app ref={this.appElementConnected.bind(this)} rootState={this.rootState}></hellodash-app>}

            {error && <div class='root-error-message'>Oops! Something went wrong...</div>}
          </hellodash-auth0-provider>
        )}

        {loading && <dash-loader></dash-loader>}
      </Host>
    );
  }
}

injectHistory(HellodashRoot);
