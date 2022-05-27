// ul with guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
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
});
