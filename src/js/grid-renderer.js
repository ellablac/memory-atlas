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

  const card = document.createElement("article");
  card.className = "card";
  if (story.storyType === "story") {
    card.classList.add("card--flip");
}
  const inner = document.createElement("div");
  inner.className = "card-inner";

  const frontLink = document.createElement("a");
  frontLink.className = "card-face card-front";
  frontLink.href = `story.html?id=${story.id}`;

  const img = document.createElement("img");
  const storyId = story.id;

    // Fallback if image does not exist
  img.onerror = () => {
    img.onerror = null; // stop looping
    img.src = "assets/images/default_card_cover.jpg";
  };

  img.src = story.cardCover || `assets/images/${storyId}-cover.jpg`;

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
  frontLink.appendChild(img);
  frontLink.appendChild(overlay);

  inner.appendChild(frontLink);
  card.appendChild(inner);

  return card;
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
