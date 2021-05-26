//Create global variables
const playersGuessed = document.querySelector(".guessed-letters"); //shows all letters guessed per round
const guessButton = document.querySelector(".guess");//button clicked for every new guess
const guessInput = document.querySelector(".letter"); //letter guessed by user
const wordInProgress = document.querySelector(".word-in-progress"); //shows letters of word in progress
const remainingGuesses = document.querySelector(".remaining"); //shows how many guesses you have left
const displayRemainingGuesses = document.querySelector(".remaining span");//span
const guessMessage = document.querySelector(".message");//messages for every guess made
const playAgainButton = document.querySelector(".play-again");//hidden play again button
let remainingGuessesCount = 8; //maximum number of guesses player can make


//will be used with JSON later
let word = "Edgar";
//array for guessed letters
const playerGuesses = [];

//Function to add placeholder for each letter
//NEEDS WORK
// Create and name a function to update the paragraph's innerText for the "words-in-progress" element with circle symbols (●) to represent each letter in the word. The symbols will stay on the screen until the correct letter is guessed (in a future step).
// Call the function and pass it the word variable as the argument. You should see 8 circle symbols on the screen, one for each letter in the word "magnolia." Hint: You'll need to use an array and then join it back to a string using the .join("") method.
const placeholder = function(word){
  //declare empty array
  const placeholderLetters =[];
  //loop through letter in word 
  //and add the dot symbol for each letter
  for(const letter of word){
    console.log(letter);
    placeholderLetters.push("●");
  }
  //update word in progress by joining
  //array to string .join
  wordInProgress.innerText = placeholderLetters.join("");
};

//call function pass word to update
//placeholder(word);

//event listener for guessButton click
//function has e=event to store event listened to
guessButton.addEventListener("click", function(e){
  //prevents reloading the page every click of button
  e.preventDefault();

  guessMessage.innerText = "";
  
  //assign input value to capture input
  const captureInput = guessInput.value; //guess

  const goodGuess = validateInput(captureInput);

  if(goodGuess){
    makeGuess(captureInput);
  }

  //console.log(captureInput);
  //erase input value for other inputs
  guessInput.value = "";
  
});

const validateInput = function(input){
  //used to check input letter and
  const acceptedLetter = /[a-zA-Z]/;//regular expression
  if(input.length === 0){
    //check if input is empty if true guessMessage is changed
    guessMessage.innterText = "Please enter one letter!"
  } else if(input.length > 1){
    //check if input is longer than one letter is true message is changed
    guessMessage.innerText = "Please enter a single letter!";
  } else if(!input.match(acceptedLetter)){
    //check if input is letter if true message is changed
    guessMessage.innerText ="Please enter a letter from a - z.";
  } else {
    //All ifs false return input.
    return input;
  }

};

const makeGuess = function(letter){
  //make all letter guessed UPPERCASE
  //assign it to letter again or else it will
  //only accept uppercase letters
  letter = letter.toUpperCase();

  //check playerGuesses array for letter guessed
  if(playerGuesses.includes(letter)){
    guessMessage.innerText = "Letter already guessed, TRY AGAIN!";
  } else {
    playerGuesses.push(letter);
    console.log(playerGuesses);
    countGuesses(letter);//updateGuessesRemaing
    showGuesses();//showGuessedLetters
    updateWordInProgress(playerGuesses);//
  };
};

const showGuesses = function(){
  //empty unordered list for player's guesses display
  playersGuessed.innerHTML = "";
  //create new list item for each letter inside
  //guessedLetters (global) and add it to unordered list
  //for each letter in playersGuessed 
  //use const li to create "li" element
  //assign letter to li content and append to playersGuessed display
  for(const letter of playerGuesses){//guessedLetters
    const li = document.createElement("li");
    li.innerText = letter
    playersGuessed.append(li);
  }
};

const updateWordInProgress = function(playerGuesses){
  const wordUpper = word.toUpperCase(); //word is globally declared
  const wordArray = wordUpper.split(""); //word is now an array
  //see what .split() does
  console.log(wordArray);

  const revealWord = [];
  //check each letter to see if it is in the
  //wordArray
  for(const letter of wordArray){
    if(playerGuesses.includes(letter)){
      //update circle symbol with the correct letter
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  //update on display
  wordInProgress.innerText = revealWord.join("");
  checkWin();
};

//update remaining guesses count
const countGuesses = function(guess){

  const upperWord = word.toUpperCase();

  if(!upperWord.includes(guess)){
    guessMessage.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuessesCount -= 1;
  } else{
    guessMessage.innerText = `Got One! The word has the letter ${guess}.`;
    }
  
  if(remainingGuessesCount === 0){
    guessMessage.innerHTML = `Game Over! The word was <span class = "hightlight">${word}</span>.`
  } else if(remainingGuessesCount === 1){
    displayRemainingGuesses.innerText = `${remainingGuessesCount} guess`;
  } else {
    displayRemainingGuesses.innerText = `${remainingGuessesCount} guesses`;
  }
};

const checkWin = function(){
  if(word.toUpperCase() === wordInProgress.innerText){
    guessMessage.classList.add("win");
    guessMessage.innerHTML = (`<p class="highlight">You Guessed Correctly! CONGRATS!!!</p>`);
  }
};