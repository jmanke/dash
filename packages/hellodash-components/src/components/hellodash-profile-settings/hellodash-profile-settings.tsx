import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { User } from '@didyoumeantoast/hellodash-models';

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

  //#endregion

  //#region @Event

  @Event({ eventName: 'hellodashProfileSettingsLogout' }) logout: EventEmitter<void>;

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
              <dash-list-item onDashListItemSelectedChanged={() => this.logout.emit()}>Logout</dash-list-item>
            </dash-list>
          </dash-dropdown>
        </Host>
      )
    );
  }
}
