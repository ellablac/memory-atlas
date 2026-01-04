/**
 * grid-renderer.js
 * ----------------
 * Renders a grid of story cards into a container element.
 */

/**
 * Create a card DOM element for a story.
 * @param {object} story
 * @returns {HTMLElement}
 */
function createCardElement(story) {
  const link = document.createElement("a");
  link.className = "card";
  link.href = `story.html?id=${story.id}`;

  const img = document.createElement("img");
  const storyId = story.id;

  img.src = story.cardCover || `assets/images/${storyId}-cover.jpg`;

  // Fallback if image does not exist
  img.onerror = () => {
    img.src = "assets/images/default_card_cover.png";
  };

  img.alt = story.title || "";

  const overlay = document.createElement("div");
  overlay.className = "card-overlay";

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = story.title || "";
  overlay.appendChild(title);

  if (story.subtitle) {
    const subtitle = document.createElement("div");
    subtitle.className = "card-subtitle";
    subtitle.textContent = story.subtitle;
    overlay.appendChild(subtitle);
  }

  link.appendChild(img);
  link.appendChild(overlay);

  return link;
}

/**
 * Render story cards into a grid container.
 * @param {HTMLElement} container
 * @param {Array<object>} stories
 */
export function renderCardGrid(container, stories) {
  container.innerHTML = "";
  stories.forEach((story) => container.appendChild(createCardElement(story)));
}
