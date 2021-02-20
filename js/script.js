const guessedLettersElement = document.querySelector('.guessed-letters');
const guessLetterButton = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
let word = 'magnolia'; // Default word if
const wordInProgress = document.querySelector('.word-in-progress');
let remainingGuesses = 6; // Let's output this to screen
const remainingGuessesElement = document.querySelector('.remaining span');
const guessedLetters = [];
const message = document.querySelector('.message');
const playAgain = document.querySelector('.play-again');

const getWord = async function () {
  const response = await fetch('../wordfile.csv');
  const words = await response.text();
  const wordArray = words.split(',');
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  console.log(word);
  placeholder(word);
};

getWord();

// Display our wordplaceholder at first paint
const placeholder = function (word) {
  const wordArray = word.toUpperCase().split('');
  const placeholderLetters = [];
  // eslint-disable-next-line no-unused-vars
  for (const _letter of wordArray) {
    placeholderLetters.push('☀️');
  }
  wordInProgress.innerText = placeholderLetters.join('');
};

guessLetterButton.addEventListener('click', () => {
  // Empty message paragraph
  message.innerText = '';

  // Let's grab what was entered in the input
  const guess = letterInput.value.toUpperCase();
  // Let's make sure that it is a single letter
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    // We've got a letter, let's guess!
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

const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersElement.innerHTML = '';

  for (const letter of guessedLetters) {
    const li = document.createElement('li');
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const makeGuess = function (guess) {
  if (guessedLetters.includes(guess)) {
    message.innerText = 'You already guessed that letter, silly. Try again.';
  } else {
    guessedLetters.push(guess);
    updateGuessesRemaining(guess); // we may or may not want this here
    // Show user what they already guessed
    showGuessedLetters();
    // New letter guessed - let's see if we're right
    updateWord(guessedLetters);
  }
};

const updateGuessesRemaining = function (guess) {
  const wordArray = word.toUpperCase().split('');
  if (!wordArray.includes(guess)) {
    // womp womp - bad guess, lose a chance
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Yep, we've got a ${guess} - good guess!`;
  }

  if (remainingGuesses === 0) {
    message.innerText = `GAME OVER. The word was ${word}`;
    startOver();
  }
  remainingGuessesElement.innerText = remainingGuesses;
};

const updateWord = function (guessedLetters) {
  const wordArray = word.toUpperCase().split('');
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push('☀️');
    }
  }
  console.log(revealWord);
  wordInProgress.innerText = revealWord.join('');

  checkIfWin();
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.innerText = 'You guessed the word!!!! WOOOO!!!';
    startOver();
  }
};

const startOver = function () {
  console.log('playAgain function fires now. Todo.');
  guessLetterButton.classList.add('hide');
  playAgain.classList.remove('hide');
};

playAgain.addEventListener('click', function () {
  remainingGuesses = 6;
  guessedLettersElement.innerHTML = '';
  getWord();
  guessLetterButton.classList.remove('hide');
  playAgain.classList.add('hide');
});
