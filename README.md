# PWA Swipe Card Game

This project is a simple progressive web app (PWA) built for Cloudflare Pages. The game presents a deck of cards that can be swiped left or right on mobile screens. You can also swipe up or down to move between cards during play.

## Gameplay
1. The first card asks **"Would you like to enlist as Tzar?"**. Swipe right for yes or left for no. You must answer this card to continue.
2. Depending on your answer, a shuffled deck of 20 questions for either **Tzar** or **Citizen** is displayed.
3. Each card can be swiped right (yes) or left (no). You may also swipe up to move forward or swipe down to return to the previous card. After you answer, the next card slides into view.

## Development
All files are static and can be deployed directly on Cloudflare Pages.

### Run locally
Just open `index.html` in a modern browser. The service worker caches files for offline access.
