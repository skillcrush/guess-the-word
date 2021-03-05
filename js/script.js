const guessedLettersElement = document.querySelector('.guessed-letters');
const guessLetterButton = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuessesElement = document.querySelector('.remaining');
const remainingGuessesSpan = document.querySelector('.remaining span');
const message = document.querySelector('.message');
const playAgainButton = document.querySelector('.play-again');

const word = 'magnolia';
const guessedLetters = [];

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  const wordArray = word.toUpperCase().split('');
  console.log(wordArray);
  const placeholderLetters = [];
  wordArray.forEach(function (letter) {
    placeholderLetters.push('☀️');
  });
  wordInProgress.innerText = placeholderLetters.join('');
};

placeholder(word);

guessLetterButton.addEventListener('click', (e) => {
  e.preventDefault();
  // Empty message paragraph
  message.innerText = '';
  // Let's grab what was entered in the input
  const guess = letterInput.value.toUpperCase();
  // Let's make sure that it is a single letter
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    // We've got a letter! Let's guess!
    makeGuess(guess);
  }
  letterInput.value = '';
});

const validateInput = function (input) {
  const acceptedLetter = /[A-Z]/;
  if (input.length === 0) {
    // Is the input empty?
    message.innerText = 'Please enter a letter';
  } else if (input.length > 1) {
    // Did you type more than one letter?
    message.innerText = 'Please enter a single letter';
  } else if (!input.match(acceptedLetter)) {
    // Did you type a number, a special character or some other non letter thing?
    message.innerText = 'We need a letter from A to Z, please.';
  } else {
    // We finally got a single letter, omg yay
    return input;
  }
};

const makeGuess = function (guess) {
  if (guessedLetters.includes(guess)) {
    message.innerText = 'You already guessed that letter, silly. Try again.';
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersElement.innerHTML = '';
  for (const letter of guessedLetters) {
    const li = document.createElement('li');
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordArray = word.toUpperCase().split('');
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push('☀️');
    }
  }
  // console.log(revealWord);
  wordInProgress.innerText = revealWord.join('');
  checkIfWin();
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add('win');
    message.innerHTML = '<p class="highlight">You guessed the word!!!! WOOOO!!!</p>';
  }
};
