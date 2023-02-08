import { BaseProps } from '../../interfaces/base-props';
import { DashDropdown, DashIconButton, DashList, DashListItem } from '../stencil-generated';
import css from './ProfileSettings.module.css';

interface Props extends BaseProps {
  user: any;
}

function logout() {}

function ProfileSettings({ user, slot }: Props) {
  return (
    <DashDropdown className={css.profileSettings} slot={slot} placement='bottom-end' placement-strategy='fixed' autoClose>
      <DashIconButton slot='dropdown-trigger' iconUrl={user.picture} icon='person' scale='l' rounded></DashIconButton>

      <DashList selection-mode='none'>
        <DashListItem onDashListItemSelectedChanged={logout}>Logout</DashListItem>
      </DashList>
    </DashDropdown>
  );
}

export default ProfileSettings;
