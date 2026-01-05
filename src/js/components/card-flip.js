/**
 * card-flip.js
 * ------------
 * Optional flip behavior for cards.
 *
 * Cards flip ONLY if they have the `card--flip` class.
 * Desktop: hover
 * Mobile: tap to flip, tap again to unflip unless "Explore" is clicked
 */

/**
 * Initialize flip behavior for cards inside a container.
 *
 * @param {HTMLElement} root - Container to search for flippable cards.
 */
export function initCardFlip(root = document) {
  const isTouchMode = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;

  if (!isTouchMode) return;

  const cards = root.querySelectorAll(".card.card--flip");

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const target = event.target;

      // Allow navigation via explicit Explore link
      if (
        target instanceof Element &&
        target.closest(".card-explore")
      ) {
        return;
      }

      event.preventDefault();

      const isFlipped = card.classList.contains("is-flipped");

      // Unflip all cards for clarity
      cards.forEach((c) => c.classList.remove("is-flipped"));

      if (!isFlipped) {
        card.classList.add("is-flipped");
      }
    });
  });
}
