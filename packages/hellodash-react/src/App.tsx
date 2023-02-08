import { DashShell, DashNavBar, DashThemeToggle, DashSideBar, DashSidebarButton, DashIconButton } from './components/stencil-generated';
import './App.css';
import Test from './components/test/Test';
import ProfileSettings from './components/profile-settings/ProfileSettings';

function App() {
  const logoPath = '/assets/icon/pomeranian.svg';

  return (
    <DashShell>
      <DashNavBar slot='header'>
        <img src={logoPath} alt='Hellodash logo' width='48' height='48' />
        <span className='logo-header'>Hellodash</span>

        <DashThemeToggle slot='content-end' class='theme-toggle' theme='light'></DashThemeToggle>
        <ProfileSettings slot='content-end' user={{}}></ProfileSettings>
      </DashNavBar>

      <Test></Test>
    </DashShell>
  );
}

export default App;
