//Create global variables
const playersGuessed = document.querySelector(".guessed-letters"); //shows all letters guessed per round
const guessButton = document.querySelector(".guess");//button clicked for every new guess
const guessInput = document.querySelector(".letter"); //letter guessed by user
const wordInProgress = document.querySelector(".word-in-progress"); //shows letters of word in progress
const remainingGuesses = document.querySelector(".remaining"); //shows how many guesses you have left
const displayRemainingGuesses = document.querySelector(".remaining span");//span
const guessMessage = document.querySelector(".message");//messages for every guess made
const playAgainButton = document.querySelector(".play-again");//hidden play again button
const word = "Magnolia";


//Function to add placeholder for each letter
//NEEDS WORK
// Create and name a function to update the paragraph's innerText for the "words-in-progress" element with circle symbols (●) to represent each letter in the word. The symbols will stay on the screen until the correct letter is guessed (in a future step).
// Call the function and pass it the word variable as the argument. You should see 8 circle symbols on the screen, one for each letter in the word "magnolia." Hint: You'll need to use an array and then join it back to a string using the .join("") method.
const placeholder = function(word){
  const placeholderLetters =[];
  for(const letter of word){
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e){
  //prevents reloading the page every click of button
  e.preventDefault();
  const captureInput = guessInput.value;
  console.log(captureInput);
  guessInput.value = "";
  
});
