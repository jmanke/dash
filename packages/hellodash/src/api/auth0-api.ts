import { dashRootService } from '../components/dash-root/dash-root-service';
import { logout } from '../utils/logout';

export async function refreshAuthToken() {
  try {
    await dashRootService.authClient?.getTokenSilently({ ignoreCache: true });
  } catch (err) {
    console.error(err);
    logout(dashRootService.authClient);
  }
}
