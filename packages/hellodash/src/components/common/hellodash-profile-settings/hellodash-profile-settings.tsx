import { Auth0Client } from '@auth0/auth0-spa-js';
import { Component, h, Host, Prop } from '@stencil/core';
import { User } from '../../../models/user';
import { logout } from '../../../utils/logout';

@Component({
  tag: 'hellodash-profile-settings',
  styleUrl: 'hellodash-profile-settings.css',
  shadow: true,
})
export class HellodashProfileSettings {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  @Prop() user: User;

  @Prop() authClient: Auth0Client;

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
              <dash-list-item onDashListItemSelectedChanged={() => logout(this.authClient)}>Logout</dash-list-item>
            </dash-list>
          </dash-dropdown>
        </Host>
      )
    );
  }
}
