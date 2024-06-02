"use strict";

// Selecting elements from the DOM
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".btn--rules");

// Initialize game variables
let scores, currentScore, activePlayer, playing;

// Function to initialize/reset the game
const init = function () {
  scores = [0, 0]; // Scores for both players
  currentScore = 0; // Current score for active player
  activePlayer = 0; // Active player (0 or 1)
  playing = true; // Game state (playing or not)

  // Set initial scores to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Hide the dice initially
  diceEl.classList.add("hidden");
  // Remove winner styles
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  // Set player 0 as active and remove active class from player 1
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// Initialize the game on page load
init();

// Function to switch the active player
const switchPlayer = function () {
  // Reset the current score for the active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Toggle between player 0 and player 1
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Reset the current score
  currentScore = 0;
  // Toggle the active player visual indication
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Set the dice image according to the rolled number
    diceEl.src = `dice-${dice}.png`;

    // 2. Display the dice
    diceEl.classList.remove("hidden");

    // 3. Check if the rolled number is not 1
    if (dice !== 1) {
      // Add the rolled number to the current score
      currentScore += dice;
      // Update the current score display for the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // If rolled number is 1, switch to the next player
      switchPlayer();
    }
  }
});

// Holding current score functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to the active player's total score
    scores[activePlayer] += currentScore;
    // Update the active player's score display
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the active player's score is 100 or more
    if (scores[activePlayer] >= 100) {
      // End the game and declare the active player as the winner
      playing = false;
      // Hide the dice
      diceEl.classList.add("hidden");
      // Add winner style to the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // Remove active style from the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player if no one has won yet
      switchPlayer();
    }
  }
});

// Event listener for resetting the game
btnNew.addEventListener("click", init);

// Function to toggle the modal visibility
const toggleModal = () => {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

// Event listeners for opening and closing the modal
btnOpenModal.addEventListener("click", toggleModal);
btnCloseModal.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);

// Event listener for closing the modal with the Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    toggleModal();
  }
});
