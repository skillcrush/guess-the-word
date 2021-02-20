const guessedLettersElement = document.querySelector('.guessed-letters');
const guessLetterButton = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
let word = 'magnolia'; // Default word if
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuessesElement = document.querySelector('.remaining');
let remainingGuesses = 6; // Let's output this to screen
const remainingGuessesSpan = document.querySelector('.remaining span');
let guessedLetters = [];
const message = document.querySelector('.message');
const playAgain = document.querySelector('.play-again');

//  Choose word
const getWord = async function () {
  const response = await fetch('../words.txt');
  const words = await response.text();
  const wordArray = words.split(('\n'));
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  if (word.length > 10) {
    getWord();
  } else {
    placeholder(word);
  }
};

// Fire off the game
getWord();

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  console.log(word);
  const wordArray = word.toUpperCase().split('');
  const placeholderLetters = [];
  wordArray.forEach(function (letter) {
    placeholderLetters.push('☀️');
  });
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
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
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
    const totalLettersGuessed = document.querySelectorAll('.guessed-letters li').length;
    message.innerHTML = `<p>You guessed the word!!!! WOOOO!!!</p><p> It took you ${totalLettersGuessed} guesses.</p>`;

    startOver();
  }
};

const startOver = function () {
  guessLetterButton.classList.add('hide');
  playAgain.classList.remove('hide');
  remainingGuessesElement.classList.add('hide');
  guessedLettersElement.classList.add('hide');
};

playAgain.addEventListener('click', function () {
  guessedLetters = [];
  remainingGuesses = 6;
  remainingGuessesSpan.innerText = '6 guesses';
  guessedLettersElement.innerHTML = '';
  message.innerText = '';
  getWord();
  guessLetterButton.classList.remove('hide');
  playAgain.classList.add('hide');
  remainingGuessesElement.classList.remove('hide');
  guessedLettersElement.classList.remove('hide');
});
