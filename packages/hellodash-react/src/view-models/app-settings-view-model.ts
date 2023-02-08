import { AppSettings } from '../models/app-settings';
import { Theme } from '../types/types';
import LocalStorageViewModel from './local-storage-view-model';

export class AppSettingsViewModel extends LocalStorageViewModel<AppSettings> {
  theme: Theme = 'light';
  sidebarCollapsed: boolean = false;

  __load(model: AppSettings) {
    this.theme = model.theme ?? 'dark';
    this.sidebarCollapsed = model.sidebarCollapsed ?? true;
  }

  __toModel(): AppSettings {
    return {
      theme: this.theme,
      sidebarCollapsed: this.sidebarCollapsed,
    };
  }
}
