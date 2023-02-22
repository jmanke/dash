import { defineCustomElements as defineDashComponents } from '@didyoumeantoast/hellodash-components/dist/loader';

/**
 * Initializes all web component packages
 */
export function initializeWebComponents() {
  // define dash-components as web components
  defineDashComponents(window, { resourcesUrl: 'hellodash-components/' });
}
