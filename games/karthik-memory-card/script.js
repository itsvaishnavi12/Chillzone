const cardsArray = ['🍎', '🍌', '🍓', '🍇', '🍒', '🍍', '🥝', '🍉'];
let cards = [...cardsArray, ...cardsArray]; // duplicate for pairs
let flippedCards = [];
let matchedPairs = 0;

const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  gameBoard.innerHTML = '';
  cards = shuffle(cards);
  cards.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = item;
    card.dataset.index = index;
    card.addEventListener('click', handleFlip);
    gameBoard.appendChild(card);
  });
}

function handleFlip(e) {
  const card = e.currentTarget;

  if (
    flippedCards.length === 2 ||
    card.classList.contains('flipped') ||
    flippedCards.includes(card)
  ) {
    return;
  }

  card.textContent = card.dataset.value;
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards;
  if (first.dataset.value === second.dataset.value) {
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === cardsArray.length) {
      message.textContent = '🎉 You found all pairs!';
    }
  } else {
    setTimeout(() => {
      first.textContent = '';
      second.textContent = '';
      first.classList.remove('flipped');
      second.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function restartGame() {
  matchedPairs = 0;
  flippedCards = [];
  message.textContent = '';
  createBoard();
}

createBoard();
