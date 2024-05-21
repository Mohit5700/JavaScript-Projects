"use strict";

// Function to get a random whole number between 1 and 20
const getSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

// Initialize the secret number
let secretNumber = getSecretNumber();

// Initialize the current score by parsing the text content of the element with the class "score"
let currentScore = Number(document.querySelector(".score").textContent);

// Initialize the high score
let highScore = 0;

// Function to change the text content of an element
const changeTextContent = (element, message) => {
  document.querySelector(element).textContent = message;
};

// Function to change the value of an input element
const changeValue = (element, message) => {
  document.querySelector(element).value = message;
};

// Event listener for the "Check" button
document.querySelector(".check").addEventListener("click", function () {
  // Get the guessed number from the input field
  const guessNumber = Number(document.querySelector(".guess").value);

  // If no number is entered or 0 is entered, display an error message
  if (!guessNumber) {
    changeTextContent(".message", "⛔ No Number!");
  }

  // If the guessed number matches the secret number, the player wins
  else if (guessNumber === secretNumber) {
    // Display the secret number
    changeTextContent(".number", secretNumber);
    // Disable the input field
    document.querySelector(".guess").disabled = true;

    // Update the high score if the current score is higher
    if (currentScore > highScore) {
      highScore = currentScore;
      changeTextContent(".highscore", highScore);
    }

    // Display a success message
    changeTextContent(".message", "🎉 Correct Number");
    // Change background color
    document.querySelector("body").style.backgroundColor = "#60b347";
    // Increase the width of the number display box
    document.querySelector(".number").style.width = "30rem";
  }

  // If the guessed number is wrong
  else if (guessNumber !== secretNumber) {
    // Keep decreasing the score until it reaches 1
    if (currentScore > 1) {
      // Display a message indicating whether the guess was too high or too low
      changeTextContent(
        ".message",
        guessNumber > secretNumber ? "📈 Too high" : "📉 Too low"
      );

      // Decrease the score by 1 for each wrong guess
      currentScore--;

      // Update the score display
      changeTextContent(".score", currentScore);
    }

    // If the score becomes 0, the player loses the game
    else {
      // Display a message indicating the loss
      changeTextContent(".message", "☹️ You lost the game");
      // Reset the score to 0
      changeTextContent(".score", 0);
    }
  }
});

// Event listener for the "Again" button
document.querySelector(".again").addEventListener("click", function () {
  // Enable the input field
  document.querySelector(".guess").disabled = false;
  // Generate a new secret number
  secretNumber = getSecretNumber();
  // Reset the displayed secret number to "?"
  changeTextContent(".number", "?");
  // Reset the score to 20
  currentScore = 20;
  changeTextContent(".score", currentScore);
  // Reset the message
  changeTextContent(".message", "Start guessing...");
  // Clear the input field
  changeValue(".guess", "");
  // Reset background color
  document.querySelector("body").style.backgroundColor = "#222";
  // Reset the width of the number display box
  document.querySelector(".number").style.width = "15rem";
});
