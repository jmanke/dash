import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { injectHistory, LocationSegments, RouterHistory } from '@stencil-community/router';
import { dashRootService } from '../dash-root/dash-root-service';
import { getAssetPath } from '@stencil/core';
import { dispatch, RootState } from '../../store';
import { setSidebarCollapsed, setTheme, toggleSidebarCollapsed } from '../../slices/app-settings-slice';
import { setError } from '../../slices/app-state-slice';
import { Label } from '../../models/label';
import { getNotePreviews } from '../../slices/notes-slice';
import { createLabel, deleteLabel, getLabels, updateLabel } from '../../slices/labels-slice';
import { isNone } from '@didyoumeantoast/dash-utils';

enum RootUrls {
  Home = '/home',
  Bin = '/bin',
  Label = '/label',
  Note = '/note',
}

@Component({
  tag: 'hellodash-app',
  styleUrl: 'hellodash-app.css',
  shadow: true,
})
export class HellodashApp {
  //#region Own properties
  logoPath: string;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  selectedLabelId?: number;

  @State()
  pathName: string;
  @Watch('pathName')
  pathNameChanged(pathName: string) {
    this.setSelectedLabel(pathName);
  }

  @State()
  isEditingLabels: boolean = false;

  @State()
  isCreatingLabel: boolean = false;
  //#endregion

  //#region @Prop
  @Prop()
  rootState: RootState;

  @Prop({
    mutable: true,
  })
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
      await Promise.all([dispatch(getNotePreviews()), dispatch(getLabels())]);
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
    }
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  selectLabel(label: Label) {
    if (label.id === this.selectedLabelId) {
      return;
    }

    this.navigateTo(`${RootUrls.Label}/${label.id}`);
  }

  navigateTo(url: string) {
    if (this.rootState.appState.mobileView && !this.rootState.appSettings.sidebarCollapsed) {
      dispatch(setSidebarCollapsed(true));
    }

    this.history.push(url);
  }

  setSelectedLabel(path: string) {
    const pattern = /(\/label\/)([0-9]+)/gm;
    const labelId = pattern.exec(path)?.[2];
    this.selectedLabelId = parseInt(labelId);
  }

  editLabels() {
    if (this.rootState.appState.mobileView && !this.rootState.appSettings.sidebarCollapsed) {
      dispatch(setSidebarCollapsed(true));
    }
    this.isEditingLabels = true;
  }

  async createLabel(label: Label) {
    this.isCreatingLabel = true;
    try {
      await dispatch(createLabel(label));
    } finally {
      this.isCreatingLabel = false;
    }
  }
  //#endregion

  render() {
    const { theme, sidebarCollapsed } = this.rootState.appSettings;
    const { currentUser } = this.rootState.appState;
    const initialized = !isNone(this.rootState.notes) && !isNone(this.rootState.labels);

    return (
      <Host>
        {initialized && (
          <dash-shell>
            <hellodash-nav-bar slot='header' onDashMenuToggled={() => dispatch(toggleSidebarCollapsed())}>
              <img src={this.logoPath} alt='Hellodash logo' width='48' height='48' />
              <span class='logo-header'>Hellodash</span>

              <dash-theme-toggle slot='content-end' class='theme-toggle' theme={theme} onDashThemeToggleChange={e => dispatch(setTheme(e.target.theme))}></dash-theme-toggle>
              <hellodash-profile-settings slot='content-end' user={currentUser} authClient={dashRootService.authClient}></hellodash-profile-settings>
            </hellodash-nav-bar>

            <dash-side-bar slot='left-panel' collapsed={sidebarCollapsed} onDashSideBarClose={() => dispatch(setSidebarCollapsed(true))}>
              <dash-sidebar-button
                icon='journal-text'
                text='Notes'
                active={this.pathName === '/' || this.pathName === RootUrls.Home}
                collapsed={sidebarCollapsed}
                onClick={() => this.navigateTo(RootUrls.Home)}
              ></dash-sidebar-button>
              {this.rootState.labels.map(label => (
                <dash-sidebar-button
                  key={label.id}
                  icon='tag-fill'
                  active={this.selectedLabelId === label.id}
                  text={label.text}
                  iconColor={label.color}
                  collapsed={sidebarCollapsed}
                  onClick={() => this.selectLabel(label)}
                ></dash-sidebar-button>
              ))}
              <dash-sidebar-button icon='pencil' text='Edit labels' collapsed={sidebarCollapsed} onClick={this.editLabels.bind(this)}></dash-sidebar-button>
              <dash-sidebar-button
                icon='trash3'
                text='Bin'
                active={this.pathName === RootUrls.Bin}
                collapsed={sidebarCollapsed}
                onClick={() => this.navigateTo(RootUrls.Bin)}
              ></dash-sidebar-button>
            </dash-side-bar>

            <main slot='content'>
              <stencil-router historyType='hash'>
                <stencil-route-switch scrollTopOffset={0}>
                  <stencil-route url={['/', RootUrls.Home, `${RootUrls.Label}/:labelId`, `${RootUrls.Note}/:noteId`]} component='hellodash-route-notes' exact={true} />
                  <stencil-route url={RootUrls.Bin} component='hellodash-route-bin' exact={true} />
                </stencil-route-switch>
              </stencil-router>
            </main>
          </dash-shell>
        )}

        {!initialized && <dash-loader></dash-loader>}

        {this.isEditingLabels && (
          <hellodash-edit-labels
            labels={this.rootState.labels}
            creatingLabel={this.isCreatingLabel}
            onDashModalClosed={() => (this.isEditingLabels = false)}
            onHellodashEditLabelsCreateLabel={e => this.createLabel(e.detail)}
            onHellodashEditLabelsDeleteLabel={e => dispatch(deleteLabel(e.detail))}
            onHellodashEditLabelsUpdateLabel={e => dispatch(updateLabel(e.detail))}
          ></hellodash-edit-labels>
        )}
      </Host>
    );
  }
}

injectHistory(HellodashApp);
