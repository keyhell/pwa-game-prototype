const introCard = "Would you like to enlist as Tzar?";

const tzarCards = [
  "Do you command the loyalty of the boyars?",
  "Will you expand the realm's borders?",
  "Do you trust your advisors completely?",
  "Will you impose new taxes for the army?",
  "Do you plan to build a grand palace?",
  "Will you allow the printing press to flourish?",
  "Will you send envoys to foreign courts?",
  "Do you accept the church's authority?",
  "Will you hold lavish feasts for the nobles?",
  "Do you believe in absolute rule?",
  "Will you create a new legal code?",
  "Do you support exploration of distant lands?",
  "Will you reform the military ranks?",
  "Do you promise to protect the peasants?",
  "Will you invite foreign architects?",
  "Do you wish to strengthen the navy?",
  "Will you host grand tournaments?",
  "Do you plan to outlaw corruption?",
  "Will you expand trade with the west?",
  "Do you vow to crush all rebellions?",
];

const citizenCards = [
  "Do you pay taxes willingly?",
  "Will you join the village militia?",
  "Do you trust the local officials?",
  "Will you help build the town hall?",
  "Do you support your neighbors in need?",
  "Will you attend the harvest festival?",
  "Do you pledge loyalty to the realm?",
  "Will you learn a craft or trade?",
  "Do you oppose harsh laws?",
  "Will you keep traditions alive?",
  "Do you seek fair treatment?",
  "Will you barter with traveling merchants?",
  "Do you care for the community well-being?",
  "Will you assist in road repairs?",
  "Do you report crimes to the guard?",
  "Will you pay homage to the Tzar?",
  "Do you stand for peaceful protests?",
  "Will you educate your children?",
  "Do you uphold the market rules?",
  "Will you pray for the realm's prosperity?",
];

let deck = [];
let answers = [];
let index = 0;
let state = 'intro';
let animating = false;
let animationPhase = null;
let currentSwipeDir = null;

const cardEl = document.getElementById('card');
const cardText = cardEl.querySelector('.card-text');
const yesBtn = document.getElementById('yes-button');
const noBtn = document.getElementById('no-button');
const shuffleBtn = document.getElementById('shuffle-button');

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function showIntro() {
  cardText.textContent = introCard;
}

function startGame(asTzar) {
  deck = shuffle(asTzar ? tzarCards : citizenCards);
  index = 0;
  state = 'game';
  cardText.textContent = deck[index];
}

function handleAnswer(ans) {
  if (state === 'intro') {
    startGame(ans === 'yes');
  } else {
    answers.push({ q: deck[index], a: ans });
    index++;
    if (index >= deck.length) {
      cardText.textContent = 'The End';
      return;
    }
    cardText.textContent = deck[index];
  }
}

function shuffleDeck() {
  if (state !== 'game') return;
  deck = shuffle(deck);
  index = 0;
  cardText.textContent = deck[index];
}

function fadeTo(callback) {
  animating = true;
  animationPhase = 'out';
  cardEl.style.transition = 'opacity 0.25s ease-out';
  cardEl.style.opacity = '0';
  const handler = () => {
    cardEl.removeEventListener('transitionend', handler);
    callback();
    animationPhase = 'in';
    cardEl.style.transition = 'opacity 0.25s ease-in';
    cardEl.style.opacity = '1';
    cardEl.addEventListener('transitionend', () => {
      animating = false;
    }, { once: true });
  };
  cardEl.addEventListener('transitionend', handler);
}

function answer(ans) {
  if (animating) return;
  fadeTo(() => handleAnswer(ans));
}

function processShuffle() {
  if (animating) return;
  fadeTo(() => shuffleDeck());
}

// Swipe logic
let startX = 0;
let startY = 0;
let isDragging = false;
const threshold = 30;
let currentDX = 0;

cardEl.addEventListener('pointerdown', e => {
  startX = e.clientX;
  startY = e.clientY;
  isDragging = true;
  currentDX = 0;
  cardEl.style.transition = 'none';
  cardEl.setPointerCapture(e.pointerId);
});

cardEl.addEventListener('pointermove', e => {
  if (!isDragging) return;
  currentDX = e.clientX - startX;
  const dy = e.clientY - startY;
  const rot = currentDX / 10;
  cardEl.style.transform = `translate(calc(-50% + ${currentDX}px), calc(-50% + ${dy}px)) rotate(${rot}deg)`;
});

cardEl.addEventListener('pointerup', e => {
  if (!isDragging) return;
  isDragging = false;
  cardEl.releasePointerCapture(e.pointerId);
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
    answer(dx > 0 ? 'yes' : 'no');
  } else {
    cardEl.style.transition = 'transform 0.25s ease-out';
    cardEl.style.transform = 'translate(-50%, -50%)';
  }
});

yesBtn.addEventListener('click', () => answer('yes'));
noBtn.addEventListener('click', () => answer('no'));
shuffleBtn.addEventListener('click', processShuffle);

showIntro();

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}
