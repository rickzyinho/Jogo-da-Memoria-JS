const cards = document.querySelectorAll(".memory-card");
const victoryScreen = document.querySelector(".victory-screen");
const restartButton = document.getElementById("restartBtn");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

shuffle();

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();

  // Check for victory
  if (document.querySelectorAll(".memory-card:not(.flip)").length === 0) {
    showVictoryScreen();
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
    card.addEventListener("click", flipCard);
  });
}

function showVictoryScreen() {
  victoryScreen.classList.remove("hidden");
}

function restartGame() {
  victoryScreen.classList.add("hidden");
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  shuffle();
}

restartButton.addEventListener("click", restartGame);
