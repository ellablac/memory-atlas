/**
 * story.js
 * --------
 * Story page entrypoint for Memory Atlas.
 *
 * Responsibilities (v1, Step 3):
 * - Read the story ID from the query string (?id=<storyId>).
 * - Load stories from stories.json.
 * - Render:
 *   - title
 *   - subtitle
 *   - optional intro text
 *   - optional hero image (only if image exists AND no children)
 *   - grid of child stories (if any)
 */

import { loadAllData } from "../data-loader.js";
import { renderCardGrid } from "../grid-renderer.js";
import { initCardFlip } from "../components/card-flip.js";

/**
 * Get the story ID from the current URL.
 *
 * @returns {string|null} The story ID, or null if not present.
 */
function getStoryIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

/**
 * Initialize the story page.
 *
 * @returns {Promise<void>}
 */
async function init() {
  const storyId = getStoryIdFromQuery();
  if (!storyId) return;

  const { stories } = await loadAllData();
  const story = stories[storyId];
  if (!story) return;

  // --- Title & subtitle ---
  const titleEl = document.getElementById("story-title");
  const subtitleEl = document.getElementById("story-subtitle");

  if (titleEl) titleEl.textContent = story.title || "";
  if (subtitleEl) subtitleEl.textContent = story.subtitle || "";

  // --- Intro text ---
  const introEl = document.getElementById("story-intro");
  if (introEl && story.introMarkdown) {
    introEl.textContent = story.introMarkdown;
  }

  // --- Hero image (only if image exists AND no children) ---
  const hasChildren = Array.isArray(story.storyIds) && story.storyIds.length > 0;
  if (story.image && !hasChildren) {
    const heroImg = document.createElement("img");
    heroImg.src = story.image;
    heroImg.alt = story.title || "";
    heroImg.style.marginBottom = "2rem";

    const headerEl = document.getElementById("story-header");
    if (headerEl) {
      headerEl.after(heroImg);
    }
  }

  // --- Child stories grid ---
  const grid = document.getElementById("card-grid");
  if (grid && hasChildren) {
    const childStories = story.storyIds
      .map((id) => stories[id])
      .filter(Boolean);

    renderCardGrid(grid, childStories);
    initCardFlip(grid);
  }
}

init();
