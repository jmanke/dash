import { LocationSegments, RouterHistory } from '@stencil-community/router';
import { EventEmitter } from '@didyoumeantoast/dash-utils';
import { HellodashRoot } from './hellodash-root';
import { Auth0Client } from '@auth0/auth0-spa-js';

const HISTORY_CHANGED_EVENTNAME = 'historyChanged';

class DashRootService {
  root: HellodashRoot;
  authClient: Auth0Client;

  private eventEmitter = new EventEmitter();

  showModal(content: HTMLElement) {
    this.root.modalContent = content;
  }

  closeModal() {
    return this.root.modalContent?.['$elm$'].close();
  }

  initHistory(history: RouterHistory) {
    history.listen((location: LocationSegments) => {
      this.eventEmitter.emit(HISTORY_CHANGED_EVENTNAME, location);
    });
  }

  addHistoryChangedListener(fn: (location: LocationSegments) => void) {
    this.eventEmitter.on(HISTORY_CHANGED_EVENTNAME, fn);
  }

  removeHistoryChangedListener(fn: (location: LocationSegments) => void) {
    this.eventEmitter.removeListener(HISTORY_CHANGED_EVENTNAME, fn);
  }
}

export const dashRootService = new DashRootService();
