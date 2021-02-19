const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const word = "magnolia"; // substitute for a 'getWord' function if we decide to use a large array
const wordInProgress = document.querySelector(".word-in-progress");
let remainingGuesses = 6; // Let's output this to screen
const remainingGuessesElement = document.querySelector(".remaining span");
const guessedLetters = []; 
const message = document.querySelector(".message");

// Display our wordplaceholder at first paint
const placeholder = function(){
  const wordArray = word.toUpperCase().split("");
  const placeholderLetters = [];
  for(let letter of wordArray){
    placeholderLetters.push("☀️")
  }
  wordInProgress.innerText = placeholderLetters.join("");
}
placeholder();

guessLetterButton.addEventListener("click", function () {
  // Empty message paragraph
  message.innerText = "";

  // Let's grab what was entered in the input
  const guess = letterInput.value.toUpperCase();
  // Let's make sure that it is a single letter
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    // We've got a letter, let's guess!
    makeGuess(guess);
  }
  
  // Show user what they already guessed
  showGuessedLetters();
});

const showGuessedLetters = function () {
    guessedLettersElement.innerText = guessedLetters;
};

const validateInput = function (input) {
  const acceptedLetter = /[A-Z]/;
  if (input.length === 0) {
    // Is the input empty?
    message.innerText = `Please enter a letter`;
    return;
  } else if (input.length > 1) {
    // Did you type more than one letter?
    message.innerText = `Please enter a single letter`;
    return;
  } else if (!input.match(acceptedLetter)) {
    // Did you type a number, a special character or some other non letter thing?
    message.innerText = `We need a letter from A to Z, please.`;
    return;
  } else {
    // We finally got a single letter, omg yay
    return input;
  }
};

const makeGuess = function (guess) {
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
  } else {
    guessedLetters.push(guess);
    updateGuessesRemaining(guess); // we may or may not want this here
  }
  // New letter guessed - let's see if we're right
  updateWord(guessedLetters);
};

function updateGuessesRemaining(guess){
  const wordArray = word.toUpperCase().split("");
  if (!wordArray.includes(guess)){
    // womp womp - bad guess, lose a chance
    message.innerText = `Sorry, the word has no ${guess}.`
    remainingGuesses -= 1;
  } else {
    message.innerText = `Yep, we've got a ${guess} - good guess!`
  }

  if (remainingGuesses === 0){
    message.innerText = `GAME OVER. The word was ${word}`;
    playAgain
  }
  remainingGuessesElement.innerText = remainingGuesses;
}

const updateWord = function(guessedLetters){

  const wordArray = word.toUpperCase().split("");
  const revealWord = [];
  for(let letter of wordArray){
    if(guessedLetters.includes(letter)){
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("☀️")
    }
  }
  console.log(revealWord)
  wordInProgress.innerText = revealWord.join("");

  checkIfWin();
}

const checkIfWin = function(){
  if (word.toUpperCase() === wordInProgress.innerText){
    message.innerText = "You guessed the word!!!! WOOOO!!!"
    playAgain();
  }
}

const playAgain = function(){
  console.log("playAgain function fires now. Todo.")
  // shows playAgain button
  // resets number of chances
  // picks new word
  // fires off placeholder function
}
