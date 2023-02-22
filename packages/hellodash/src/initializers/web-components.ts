import { defineCustomElements as defineDashComponents } from "@didyoumeantoast/dash-components/loader";

/**
 * Initializes all web component packages
 */
export function initializeWebComponents() {
  // define dash-components as web components
  defineDashComponents(window, { resourcesUrl: "dash-components/" });
}
