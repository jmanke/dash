// import { EventEmitter } from "@didyoumeantoast/dash-utils";
import { Auth0Client } from "@auth0/auth0-spa-js";

// const HISTORY_CHANGED_EVENTNAME = "historyChanged";

class HellodashService {
  authClient!: Auth0Client;

  //   private eventEmitter = new EventEmitter();

  //   initHistory(history: RouterHistory) {
  //     history.listen((location: LocationSegments) => {
  //       this.eventEmitter.emit(HISTORY_CHANGED_EVENTNAME, location);
  //     });
  //   }

  //   addHistoryChangedListener(fn: (location: LocationSegments) => void) {
  //     this.eventEmitter.on(HISTORY_CHANGED_EVENTNAME, fn);
  //   }

  //   removeHistoryChangedListener(fn: (location: LocationSegments) => void) {
  //     this.eventEmitter.removeListener(HISTORY_CHANGED_EVENTNAME, fn);
  //   }
}

export const hellodashService = new HellodashService();
