/**
 * data-loader.js
 * --------------
 * Centralized utilities for loading JSON data.
 */

const DATA_PATH = 'data';

/**
 * Fetch a JSON file from the data directory.
 * @param {string} filename
 * @returns {Promise<any>}
 */
async function loadJson(filename) {
  const response = await fetch(`${DATA_PATH}/${filename}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${filename}`);
  }
  return response.json();
}

/**
/**
 * Load site data required for rendering pages.
 * @returns {Promise<{site: any, stories: any}>}
 */
export async function loadAllData() {
  const [site, stories] = await Promise.all([
    loadJson('site.json'),
    loadJson('stories.json')
  ]);

  return { site, stories };
}
