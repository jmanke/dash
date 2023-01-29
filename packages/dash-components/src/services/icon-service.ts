import { getAssetPath } from '@stencil/core';

/**
 * Mediates finding the correct SVG icons
 */
class IconService {
  /**
   * caches SVG values
   */
  cache = new Map<string, Array<string>>();

  /**
   * Gets the raw SVG paths
   * @param icon - icon name
   * @returns SVG paths
   */
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
