import { tracked } from '../decorators/tracked';
import { AppSettings } from '../models/app-settings';
import { Theme } from '../types/types';
import LocalStorageViewModel from './local-storage-view-model';

export class AppSettingsViewModel extends LocalStorageViewModel<AppSettings> {
  @tracked theme: Theme;
  @tracked sidebarCollapsed: boolean;

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
