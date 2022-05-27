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
const remainingGuessesSpan = document.querySelector(".remaining span");
// alert messages
const message = document.querySelector(".message");
// play again button (initially hidden)
const playAgainButton = document.querySelector(".play-again");
// test word
let word = "magnolia";
// array for holding guessed guessed letters
const guessedLetters = [];
// starting value for remaining guesses
let remainingGuesses = 8;

// api function to retrieve random words for game
const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

// let's play!
getWord();

// add symbols for letter placeholders
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guess = textInput.value;
  const goodGuess = validate(guess);
  if (goodGuess) {
    makeGuess(guess);
  }
  textInput.value = "";
});

const validate = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Enter a letter (A-Z).";
  } else if (input.length > 1 ) {
    message.innerText = "Only enter one letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Enter a letter (A-Z).";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "Can't reuse letters.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateGuessesRemaining(guess);
    playerGuesses();
    updateGuessedLetters(guessedLetters);
  }
};

const playerGuesses = function () {
  // Clear list before playing
  guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = letter;
      guessedLettersElement.append(li);
    }
};

const updateGuessedLetters = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
}
wordInProgress.innerText = revealWord.join("");
checkIfWin();
};

const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}'s.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="hightlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    remainingGuesses.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuesses.innerText = `${remainingGuesses} guesses`;
  }
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word. Yay!</p>`;
  }
};
