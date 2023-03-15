import { getAssetPath } from '@stencil/core';

/**
 * Mediates finding the correct SVG icons
 */
class IconService {
  /**
   * caches SVG values
   */
  cache = new Map<string, { paths: Array<string> }>();

  /**
   * Gets the raw SVG paths
   * @param icon - icon name
   * @returns SVG paths
   */
  async getIconPaths(icon: string) {
    const iconPathName = getAssetPath(`assets/icon-paths/${icon}.json`);
    let { paths } = this.cache.get(iconPathName) ?? {};
    if (paths) {
      return paths;
    }

    try {
      const resp = await fetch(iconPathName, { cache: 'force-cache' });
      const json = await resp.json();
      paths = json.paths;
      this.cache.set(iconPathName, json);
    } catch (e) {
      console.error(`Failed to load '${icon}' at path '${iconPathName}'`, e);
    }

    return paths;
  }
}

export default new IconService();
