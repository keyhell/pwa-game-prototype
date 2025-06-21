# PWA Swipe Card Game

This project is a simple progressive web app (PWA) built for Cloudflare Pages. The game presents a deck of cards that can be swiped left or right on mobile screens. A shuffle button lets you randomize the deck.

## Gameplay
1. The first card asks **"Would you like to enlist as Tzar?"**. Swipe right for yes or left for no, or use the yes/no buttons below the card. You must answer this card to continue.
2. Depending on your answer, a shuffled deck of 20 questions for either **Tzar** or **Citizen** is displayed.
3. Each card can be swiped right (yes) or left (no), or answered using the buttons. The shuffle button above the card reshuffles the remaining questions. Cards fade out when answered and the next one fades in.

## Development
All files are static and can be deployed directly on Cloudflare Pages.

### Run locally
Just open `index.html` in a modern browser. The service worker caches files for offline access.
