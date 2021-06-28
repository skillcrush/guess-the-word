const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenbutton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//Write a Function to Add Placeholders for Each Letter
const placeholder = function(word) {
  placeholderArray = [];
  for(const w of word) {
    placeholderArray.push("●");
  }
  //console.log(placeholderArray);
  wordInProgress.innerText = placeholderArray.join("");
};

placeholder(word);

//Add an Event Listener for the Button
guessButton.addEventListener("click", function(e) {
  e.preventDefault();
  message.innerText = "";
  const userGuess = letterInput.value;
  //Validate Input in the Button Event Handler
  const goodGuess = checkPlayersInput(userGuess);
  if (goodGuess) {
    makeGuess(userGuess);
  }
  //console.log(goodGuess);
  letterInput.value = "";



});

//Create a Function to Check Player's Input
const checkPlayersInput = function(input){
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0 ) {
    message.innerText = "Please enter a letter";
  }
  else if (input.length > 1) {
    message.innerText = "Please enter only ONE letter from A to Z";
  }
  else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z";
  }
  else {
    return input;
  }
};

const makeGuess = function(guess){
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You tried that letter already, try again.";
  }
  else {
    guessedLetters.push(guess);
    console.log(guessedLetters);

  }

};
