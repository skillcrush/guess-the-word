const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenbutton = document.querySelector(".play-again");

const word = "magnolia";

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
  const userGuess = letterInput.value;
  console.log(userGuess);
  letterInput.value = "";
});
