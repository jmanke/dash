import { getAssetPath } from '@stencil/core';

class IconService {
  cache = new Map<string, Array<string>>();

  async getIconPaths(icon: string) {
    const iconPathName = getAssetPath(`assets/icon-paths/${icon}.json`);
    let paths = this.cache.get(iconPathName);
    if (paths) {
      return paths;
    }

    const resp = await fetch(iconPathName, { cache: 'force-cache' });
    paths = JSON.parse(await resp.text()).paths;
    this.cache.set(iconPathName, paths);

    return paths;
  }
}

export default new IconService();
