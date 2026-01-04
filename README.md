# Memory Atlas

**Memory Atlas** is a flexible, visual system for organizing and exploring content as a grid of expandable cards.

Each card represents a *memory unit* — which can be a story, photo collection, study note, lesson, video, or any other kind of media. Cards can be expanded into their own detailed views and may contain other cards.

The core idea is inspired by concepts like a *memory palace*: structured, navigable, and designed for recall and understanding.

---

## Core Concepts

- **Atlas**  
  The overall collection — a navigable space containing many memory units.

- **Memory (Card)**  
  A single unit displayed in the grid. A memory can represent:
  - a story
  - a photo album
  - study notes
  - educational content
  - mixed media

- **Expanded View**  
  Each card can be opened into its own dedicated view.

---

## Key Features

- Grid-based layout of expandable memory cards
- Support for multiple content types (text, images, media)
- AI-first design
- Can be used for:
  - personal use
  - education
  - documentation
  - storytelling
  - memory training

---

## Project Structure

File structure (subject to change):

```text
memory-atlas/
├── src/ 

│   ├── index.html
│   ├── story.html
│   ├── photos.html
│   ├── data/                    # Authoring data (source of truth)
│   │   ├── site.json
│   │   └── stories.json
│   ├── assets/                  # Static assets (copied to dist)
│   │   ├── images/
│   │   └── fonts/               
│   ├── css/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── states.css
│   └── js/
│       ├── data-loader.js
│       ├── grid-renderer.js
│       ├── nav-renderer.js
│       ├── share-modal.js
│       └── page-entrypoints/
│           ├── index.js
│           ├── story.js
│           └── photos.js
│
├── dist/                        # Build output (what GitHub Pages serves)
│   └── (generated)
│
├── tools/                       # Build + utilities (Python)
│   ├── build.py
│   ├── validate_data.py
│   └── README.md                # tooling notes
│
├── docs/
│   ├── design.md
│   └── TODO.md
├── README.md
└── .gitignore

For more project design details see the docs folder.