// ul with guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");
// guess button
const guessButton = document.querySelector(".guess");
// text input
const textInput = document.querySelector(".letter");
// progress paragraph
const wordInProgress = document.querySelector(".word-in-progress");
// remaining guesses paragraph
const remainingGuessesP = document.querySelector(".remaining");
// remaining guesses span
const remainingGuessesSpan = document.querySelector("span");
// alert messages
const guessMessages = document.querySelector(".message");
// play again button (initially hidden)
const playAgainButton = document.querySelector(".play-again");
// test word
const word = "magnolia";
// array for holding guessed guessed letters
const guessedLetters = [];

const placeholder = function(word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e) {
  e.preventDefault();
  const inputValue = textInput.value;
  console.log(inputValue);
  textInput.value = "";
  validate(inputValue);
});

const validate = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input === 0) {
    guessMessages.innerText = "Enter a letter (A-Z).";
  } else if (input.length >1 ) {
    guessMessages.innerText = "Only enter one letter.";
  } else if (!input.match(acceptedLetter)) {
    guessMessages.innerText = "Enter a letter (A-Z).";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    guessMessage.innerText = "Can't reuse letters.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
