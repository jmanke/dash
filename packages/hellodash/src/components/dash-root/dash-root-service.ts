import { LocationSegments, RouterHistory } from '@stencil-community/router';
import { EventEmitter } from '@didyoumeantoast/dash-utils';
import { DashRoot } from './dash-root';

const HISTORY_CHANGED_EVENTNAME = 'historyChanged';

class DashRootService {
  dashRoot: DashRoot;
  private eventEmitter = new EventEmitter();

  showModal(content: HTMLElement) {
    this.dashRoot.modalContent = content;
  }

  closeModal() {
    return this.dashRoot.modalContent?.['$elm$'].close();
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
