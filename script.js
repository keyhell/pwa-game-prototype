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
  "Do you vow to crush all rebellions?"
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
  "Will you pray for the realm's prosperity?"
];

let deck = [];
let answers = [];
let index = 0;
let state = 'intro';
let animating = false;
let currentSwipeDir = null;

const currentEl = document.getElementById('current-card');
const nextEl = document.getElementById('next-card');

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function showIntro() {
  currentEl.textContent = introCard;
  nextEl.classList.add('hidden');
}

function startGame(asTzar) {
  deck = shuffle(asTzar ? tzarCards : citizenCards);
  index = 0;
  state = 'game';
  currentEl.textContent = deck[index];
  prepareNext();
}

function prepareNext() {
  if (index + 1 < deck.length) {
    nextEl.textContent = deck[index + 1];
    nextEl.className = 'card enter-from-bottom';
  } else {
    nextEl.className = 'card hidden';
  }
}

function handleAnswer(ans) {
  if (state === 'intro') {
    startGame(ans === 'yes');
  } else {
    answers.push({ q: deck[index], a: ans });
    index++;
    if (index >= deck.length) {
      currentEl.textContent = 'The End';
      nextEl.className = 'card hidden';
      return;
    }
    currentEl.textContent = deck[index];
    prepareNext();
  }
}

function onTransitionEnd() {
  if (!animating) return;
  animating = false;
  currentEl.className = 'card';
  nextEl.classList.remove('center');
  handleAnswer(currentSwipeDir === 'right' ? 'yes' : 'no');
}

function swipe(dir) {
  if (animating) return;
  currentSwipeDir = dir;
  animating = true;
  currentEl.classList.add(dir === 'right' ? 'move-right' : 'move-left');
  nextEl.classList.remove('enter-from-bottom');
  nextEl.classList.add('center');
}

let startX = 0;
let startY = 0;
const threshold = 30;

currentEl.addEventListener('pointerdown', e => {
  startX = e.clientX;
  startY = e.clientY;
});

currentEl.addEventListener('pointerup', e => {
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
    swipe(dx > 0 ? 'right' : 'left');
  }
});

currentEl.addEventListener('transitionend', onTransitionEnd);

showIntro();

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}
