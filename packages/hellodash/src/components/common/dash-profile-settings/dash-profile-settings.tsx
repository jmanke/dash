import { Component, h, Host, Prop } from '@stencil/core';
import appState from '../../../stores/app-state';
import { logout } from '../../../utils/logout';
import { UserViewModel } from '../../../view-models/user-view-model';

@Component({
  tag: 'dash-profile-settings',
  styleUrl: 'dash-profile-settings.css',
  shadow: true,
})
export class DashProfileSettings {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop()
  user: UserViewModel;
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  //#endregion

  render() {
    return (
      this.user && (
        <Host>
          <dash-dropdown placement='bottom-end' placement-strategy='fixed' autoClose>
            <dash-icon-button slot='dropdown-trigger' iconUrl={this.user.picture} icon='person' scale='l' rounded></dash-icon-button>
            
            <dash-list selection-mode='none'>
              <dash-list-item onDashListItemSelectedChanged={() => logout(appState.authClient)}>Logout</dash-list-item>
            </dash-list>
          </dash-dropdown>
        </Host>
      )
    );
  }
}
