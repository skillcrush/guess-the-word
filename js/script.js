//Simple Javacript Word game tat alows user to play a word guessing game.
//Uses a word list to generate a random word and user has 8 tries toguess the word.
//Want to add a hint functionality that allows play to get a hint of a letter in the word
//Also case expression. Currently the word appears in console.
//Turn off this feature by commenting out line 32.


const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const hintElement = document.querySelector(".hint");
const hintButton = document.querySelector(".get-hint");

let word = "magnolia";
let guessedLetters = [];
//Number of gueses
let numOfGuesses = 2;
//Added mod to reset number of guesses in one place
let remainingGuesses = numOfGuesses;
let hintAlready = false;

//Sets the span in HTML to the number of guesses assigned
remainingGuessesSpan.innerText = `${remainingGuesses} guesses`

const getWord = async function() {
  const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await res.text();
  const wordArray = words.split("\n");
  const randomNumber = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomNumber].trim();
  placeholder(word);
  console.log(word);
};
getWord();

//Write a Function to Add Placeholders for Each Letter
const placeholder = function(word) {
  placeholderArray = [];
  for(const w of word) {
    placeholderArray.push("●");
  }
  //console.log(placeholderArray);
  wordInProgress.innerText = placeholderArray.join("");
};

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

//Make a guess - update the number of guesses left and the letters guessed
const makeGuess = function(guess){
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You tried that letter already, try again.";
  }
  else {
    guessedLetters.push(guess);
    //console.log(guessedLetters);
    updateRemainingGuesses(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }

};

//Create a Function to Count Guesses Remaining
const updateRemainingGuesses = function (guess) {
  const wordUpper = word.toUpperCase();
  //Determin guessed letter in in mystery word
  if (!wordUpper.includes(guess)) {
    remainingGuesses -= 1;
    message.innerText = `Sorry the mystery word has no ${guess.toUpperCase()}'s in it. Try again`
  }
  else {
    message.innerText = `Way to go! There is a ${guess} in the mystery word.`
  }
  //Count the number of guesses
  if(remainingGuesses === 0) {
    remainingGuessesSpan.innerText = `no guesses`
    message.innerText = `Sorry! Game over. The mystery word is: ${wordUpper}.`
    //Displays play again button if player LOSES
    startOver();
  }
  else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`
  }
  else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
  }
};

//Create a Function to Show the Guessed Letters
const showGuessedLetters = function() {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const liElement = document.createElement("li");
    liElement.innerText = letter;
    guessedLettersElement.append(liElement)
  }
};

//Updates the word as guesses are added
const updateWordInProgress = function(guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  //console.log(wordArray);
  for (const letter of wordArray) {
   if (guessedLetters.includes(letter)) {
     revealWord.push(letter.toUpperCase());
   } else {
     revealWord.push("●");
   }
 }
 wordInProgress.innerText = revealWord.join("");
 checkIfWin();
 checkIfHint();
};

//Check to see if player won the game
const checkIfWin = function() {
  const wordUpper = word.toUpperCase();
  if (wordUpper === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    //Displays play again button if player WINS
    startOver();
  }
};

//Allows user toplay the gam again
const startOver = function() {
  guessButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
  message.classList.remove("win");
  remainingGuesses = numOfGuesses;
  guessedLetters = [];
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  message.innerText = '';
  guessedLettersElement.innerHTML = '';
  getWord();
  guessButton.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  playAgainButton.classList.add("hide");
});


//Create a funtion to get a hint

//Check to see f yo have half of the number of gueses
const checkIfHint = function() {
  const halfGuesses = Math.floor(numOfGuesses/2);
  //console.log(halfGuesses);
  if (halfGuesses >= remainingGuesses) {
    hintButton.classList.remove("hide");
  }

  if (hintAlready == true) {
    hintButton.classList.add("hide");
    hintElement.classList.add("hide");
  }
};

//Get a letter fpr the hint
const makeHint = function() {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWordArray = wordInProgress.innerText.split("");
  const hintPlace = revealWordArray.indexOf("●");
  if (hintPlace >= 0) {
    const hintLetter = wordArray[hintPlace];
    return hintLetter;
  }
  else {
    return false;
  }
};

//Updates the document text with hint
const updateHint = function(hint) {
  if(hint == false) {
    hintElement.innerText = "You guessed everything. Good Job on the win!";
  }
  else {
    hintElement.innerText = `Did you try ${hint}?`
  }
};

//Listens for the button
hintButton.addEventListener("click", function() {
  const hint = makeHint();
  updateHint(hint);

  hintElement.classList.remove("hide");
  hintButton.classList.add("hide");
  hintAlready = true;
});
