//Create global variables to select the following elements
const guessedLetters = document.querySelector(".guessed-letters");
const guessedLetterButton = document.querySelector(".guess");
const guessLetter = document.querySelector("guess-letter");
const remainingGuesses = document.querySelector(".remaining-guesses");
const wordProgress = document.querySelector(".word-in-progress");
const guessDisplaySpan = document.querySelector(".display");
const message = document.querySelector(".message");
const PlayAgainButton = document.querySelector(".play-again hide");

const word = magnolia;

//Write a Function to Add Placeholders for Each Letter
const  placeholder = function (word) {
   const placeholderLetters = [];
   for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
   }
//Call the function and pass it the word variable as the argument.
wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);


guessLetterButton.addEventListener("clicks", function(e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letter.inputValue = "";  
});


  

    

    