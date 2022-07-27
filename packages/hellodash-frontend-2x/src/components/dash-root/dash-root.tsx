import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil/router';
import { CONSTANTS } from '../../constants';
import { appState } from '../../stores/app-state';
import { Theme } from '../../types/types';
import { AppSettingsViewModel } from '../../view-models/app-settings-view-model';
import { dashRootService } from './dash-root-service';

@Component({
  tag: 'dash-root',
  styleUrl: 'dash-root.css',
})
export class DashRoot {
  //#region Own properties
  windowResizeCallback: (e: UIEvent) => void;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLElement;
  //#endregion

  //#region @State
  @State()
  isMenuVisible = false;

  @State()
  modalContent: HTMLElement;

  @State()
  appStateLoaded: boolean;

  @State()
  appElementReady: boolean;

  @State()
  authClient: Auth0Client;
  //#endregion

  //#region @Prop
  @Prop()
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
  @Listen('dashModalClosed')
  modalClosed() {
    this.modalContent = undefined;
  }
  //#endregion

  //#region Component lifecycle
  async componentWillLoad() {
    dashRootService.dashRoot = this;
    appState.authClient = await createAuth0Client({
      domain: CONSTANTS.AUTH0_DOMAIN,
      client_id: CONSTANTS.AUTH0_CLIENTID,
      audience: CONSTANTS.AUTH0_AUDIENCE,
      useRefreshTokens: true,
    });

    const appSettings = new AppSettingsViewModel('hellodash-app-settings');
    appState.settings = appSettings;

    const updateTheme = (theme: Theme) => {
      document.documentElement.dataset.theme = theme;
    };

    updateTheme(appState.settings.theme);
    appSettings.__onChange('theme', updateTheme);

    this.appStateLoaded = true;
  }

  setMobileView() {
    if (document.body.clientWidth < 600 && !appState.mobileView) {
      appState.mobileView = true;
    } else if (document.body.clientWidth >= 600 && appState.mobileView) {
      appState.mobileView = false;
    }
  }

  connectedCallback() {
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
  async appElementConnected(e: HTMLDashAppElement) {
    await e.componentOnReady();

    this.appElementReady = true;
  }
  //#endregion

  render() {
    return (
      <Host>
        {this.appStateLoaded && (
          <dash-auth0-provider authClient={appState.authClient}>
            {!appState.error && appState.currentUser && [<dash-app ref={this.appElementConnected.bind(this)}></dash-app>, <div class='modal-root'>{this.modalContent}</div>]}

            {appState.error && <div class='root-error-message'>Oops! Something went wrong...</div>}
          </dash-auth0-provider>
        )}

        {(!this.appStateLoaded || !this.appElementReady) && <dash-loader></dash-loader>}
      </Host>
    );
  }
}

injectHistory(DashRoot);
