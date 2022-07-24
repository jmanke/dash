import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { injectHistory, LocationSegments, RouterHistory } from '@stencil/router';
import { appState } from '../../stores/app-state';
import labelsState from '../../stores/labels-store';
import notesState from '../../stores/notes-state';
import { LabelViewModel } from '../../view-models/label-view-model';
import { dashRootService } from '../dash-root/dash-root-service';
import { getAssetPath } from '@stencil/core';

enum RootUrls {
  Home = '/home',
  Bin = '/bin',
  Label = '/label',
  Note = '/note',
}

@Component({
  tag: 'dash-app',
  styleUrl: 'dash-app.css',
  shadow: true,
})
export class DashApp {
  //#region Own properties
  logoPath: string;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  selectedLabelId?: number;

  @State()
  initialized: boolean;

  @State()
  pathName: string;
  @Watch('pathName')
  pathNameChanged(pathName: string) {
    this.setSelectedLabel(pathName);
  }

  @State()
  sidebarCollapsed: boolean;
  //#endregion

  //#region @Prop
  @Prop()
  history: RouterHistory;
  @Watch('history')
  historyChanged(history: RouterHistory) {
    if (!history) {
      return;
    }

    this.pathName = this.history.location.pathname;
    dashRootService.addHistoryChangedListener((location: LocationSegments) => {
      if (location.pathname.startsWith(RootUrls.Note)) {
        return;
      }

      this.pathName = location.pathname;
    });
  }
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  async componentWillLoad() {
    this.logoPath = getAssetPath('./assets/icon/pomeranian.svg');

    try {
      await Promise.all([notesState.init(), labelsState.init()]);
      this.initialized = true;
    } catch (error) {
      console.error(error);
      appState.error = true;
    }
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  selectLabel(label: LabelViewModel) {
    if (label.id === this.selectedLabelId) {
      return;
    }

    this.navigateTo(`${RootUrls.Label}/${label.id}`);
  }

  navigateTo(url: string) {
    this.history.push(url);
  }

  setSelectedLabel(path: string) {
    const pattern = /(\/label\/)([0-9]+)/gm;
    const labelId = pattern.exec(path)?.[2];
    this.selectedLabelId = parseInt(labelId);
  }

  toggleTheme() {
    appState.settings.theme = appState.settings.theme === 'light' ? 'dark' : 'light';
  }

  editLabels() {
    const labelsModal = <dash-edit-labels></dash-edit-labels>;
    dashRootService.showModal(labelsModal);
  }
  //#endregion

  render() {
    return (
      <Host>
        {this.initialized && (
          <dash-shell>
            <dash-nav-bar slot='header' onDashMenuToggled={() => (appState.settings.sidebarCollapsed = !appState.settings.sidebarCollapsed)}>
              <img src={this.logoPath} alt='Hellodash logo' width='48' height='48' />
              <span class='logo-header'>Hellodash</span>

              <dash-theme-toggle slot='content-end' class='theme-toggle' theme={appState.settings.theme} onClick={this.toggleTheme.bind(this)}></dash-theme-toggle>
              <dash-profile-settings slot='content-end' user={appState.currentUser}></dash-profile-settings>
            </dash-nav-bar>

            <dash-side-bar slot='left-panel' collapsed={appState.settings.sidebarCollapsed} onDashSideBarClose={() => (appState.settings.sidebarCollapsed = true)}>
              <dash-sidebar-button
                icon='journal-text'
                text='Notes'
                active={this.pathName === '/' || this.pathName === RootUrls.Home}
                collapsed={appState.settings.sidebarCollapsed}
                onClick={() => this.navigateTo(RootUrls.Home)}
              ></dash-sidebar-button>
              {labelsState.labels.map(label => (
                <dash-sidebar-button
                  key={label.id}
                  icon='tag-fill'
                  active={this.selectedLabelId === label.id}
                  text={label.text}
                  iconColor={label.color}
                  collapsed={appState.settings.sidebarCollapsed}
                  onClick={() => this.selectLabel(label)}
                ></dash-sidebar-button>
              ))}
              <dash-sidebar-button icon='pencil' text='Edit labels' collapsed={appState.settings.sidebarCollapsed} onClick={this.editLabels.bind(this)}></dash-sidebar-button>
              <dash-sidebar-button
                icon='trash3'
                text='Bin'
                active={this.pathName === RootUrls.Bin}
                collapsed={appState.settings.sidebarCollapsed}
                onClick={() => this.navigateTo(RootUrls.Bin)}
              ></dash-sidebar-button>
            </dash-side-bar>

            <dash-page-container slot='content'>
              <stencil-router historyType='hash'>
                <stencil-route-switch scrollTopOffset={0}>
                  <stencil-route url={['/', RootUrls.Home, `${RootUrls.Label}/:labelId`, `${RootUrls.Note}/:noteId`]} component='dash-route-notes' exact={true} />
                  <stencil-route url={RootUrls.Bin} component='dash-route-bin' exact={true} />
                </stencil-route-switch>
              </stencil-router>
            </dash-page-container>
          </dash-shell>
        )}

        {!this.initialized && <dash-loader></dash-loader>}
      </Host>
    );
  }
}

injectHistory(DashApp);
