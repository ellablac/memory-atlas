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
import { renderHeaderDecorations } from "../components/header-decorations.js";


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

  // ******************************
  // --- Load data ---
  // ******************************
  const storyId = getStoryIdFromQuery();
  if (!storyId) return;

  const { stories } = await loadAllData();
  const story = stories[storyId];
  if (!story) return;

  // ******************************
  // --- Set the background of the page ---
  // ******************************
  document.body.classList.add("atmospheric");
  applyStoryBackground(story);

  // ******************************
  // --- Hero image (only if image exists) ---
  // ******************************
  if (story.hero) {
    const heroImg = document.getElementById("hero-image");
    heroImg.src = story.hero.src;
    heroImg.alt = story.hero.alt || story.title || "";
  }

  // ******************************
  // --- Title & subtitle ---
  // ******************************
  const titleEl = document.getElementById("story-title");
  const subtitleEl = document.getElementById("story-subtitle");

  if (titleEl && story.title) titleEl.textContent = story.title || "";
  if (subtitleEl && story.subtitle) subtitleEl.textContent = story.subtitle || "";

  const headerEl = document.getElementById("story-header");
  if (headerEl) {
    renderHeaderDecorations(story, headerEl);
  }


  // ******************************
  // --- Intro text ---
  // ******************************
  const introEl = document.getElementById("story-intro");
  if (introEl && story.introMarkdown) {
    introEl.textContent = story.introMarkdown;
  }

  // ******************************
  // --- Child stories grid ---
  // ******************************
  const hasChildren =
    Array.isArray(story.storyIds) && story.storyIds.length > 0;
  const grid = document.getElementById("card-grid");

  if (grid && hasChildren) {
    const childStories = story.storyIds
      .map((id) => stories[id])
      .filter(Boolean);

    renderCardGrid(grid, childStories);
    initCardFlip(grid);
  }

  // ******************************
  // --- Main image (only if it is an image type story with no children) ---
  // ******************************
  if (story.type === "image" && !hasChildren) {
    const mainImg = document.createElement("img");
    mainImg.src = story.image;
    mainImg.alt = story.title || "";
    mainImg.style.marginBottom = "2rem";
  }
}

/**
 * Apply a story-defined background to the document body.
 *
 * Expected story.background shape:
 * {
 *   type: "color" | "gradient" | "image",
 *   value: string
 * }
 *
 * @param {Object} story
 * @returns {void}
 */
function applyStoryBackground(story) {
  if (!story || !story.background || !story.background.type || !story.background.value) {
    return;
  }

  const { type, value } = story.background;



  // Reset previous background styles
  document.body.style.backgroundColor = "";
  document.body.style.backgroundImage = "";
  document.body.style.backgroundSize = "";
  document.body.style.backgroundRepeat = "";
  document.body.style.backgroundPosition = "";

  if (type === "color") {
    document.body.style.backgroundColor = value;
    return;
  }

  if (type === "gradient") {
    document.body.style.backgroundImage = value;
    return;
  }

  if (type === "image") {
    // Enable full-viewport overlay
    document.body.classList.add("atmospheric");
    document.body.style.backgroundImage = `url("${value}")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }
}
init();
