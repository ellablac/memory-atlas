/**
 * Render header decorations for a story.
 *
 * @param {Object} story
 * @param {HTMLElement} headerEl
 */
export function renderHeaderDecorations(story, headerEl) {
  const container = headerEl.querySelector(
    ".page-header-decorations"
  );

  if (!container || !Array.isArray(story.headerDecorations)) {
    return;
  }

  story.headerDecorations.forEach((decoration) => {
    if (!decoration.src || !decoration.position) return;

    const img = document.createElement("img");
    img.src = decoration.src;
    img.alt = "";
    img.className = `header-decoration header-decoration--${decoration.position}`;

    container.appendChild(img);
  });
}
