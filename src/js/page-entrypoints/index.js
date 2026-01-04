/**
 * index.js
 * --------
 * Landing page entrypoint for Memory Atlas.
 *
 * In v1, this file:
 * - Loads site, story, and card data from JSON.
 * - Builds a list of landing-page story cards.
 * - Renders those cards into the card grid.
 */

import { loadAllData } from "../data-loader.js";
import { renderCardGrid } from "../grid-renderer.js";

/**
 * Initialize the landing page.
 *
 * Responsibilities:
 * - Fetch site-wide data from JSON files.
 * - Resolve which stories should appear on the landing page.
 * - Render a grid of story cards with real links.
 *
 * Assumptions:
 * - An element with id="card-grid" exists in the DOM.
 * - Data files are served via HTTP (not file://).
 *
 * @returns {Promise<void>}
 */
async function init() {
  const grid = document.getElementById("card-grid");
  if (!grid) return;

  const { site, stories } = await loadAllData();

    const landingStories = site.homeStoryIds
    .map((id) => stories[id])
    .filter(Boolean);

  renderCardGrid(grid, landingStories);
}

init();
