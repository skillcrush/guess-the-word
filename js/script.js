//the unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//the button with the text "Guess"
const guessButton = document.querySelector(".guess");
//the text input where the player will guess a letter
const inputLetter = document.querySelector(".letter");
//the empty paragrph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//the paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
//the span inside the paragraph where the remaining guesses will display
const numberGuesses = document.querySelector(".remaining span");
//the empty paragraph where messages will appear when the player guesses a letter
const guessMessage = document.querySelector(".message");
//the hidden button that will appear to prompt to player to play again
const playAgainButton = document.querySelector(".play-again");

//starting word
let word = "magnolia";

//global variable with empty array, to contain all letters guessed by player
let guessedLetters = [];

//global variable for number of remaining guesses, starting value is 8
let remainingGuesses = 8;

const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    if (!request.ok) {
        placeholderDots(word);
        console.log("Response failed. Using default word");
    
    } else {
        const words = await request.text();
        console.log(`words from the file`)
        console.log(words);
        const getWordArray = words.split("\n");
        console.log(`this is getWordArray`)
        console.log(getWordArray);
        const randomWordIndex = Math.floor(Math.random() * getWordArray.length);
        word = getWordArray[randomWordIndex].trim();
        if (word.length > 10) {
            getWord();
        } else {
        placeholderDots(word);
        }
    }
};

//function to add placeholder dots for each letter of the hidden word
const placeholderDots = function(word) {
    inputLetter.focus();
    const dotArray = [];
    const splitWord = word.split("");
    for (const letter of splitWord) {
        dotArray.push("●");
    }
    wordInProgress.innerText = dotArray.join("");
};

//Start the game
getWord();

//event listener/handler for Guess button
//- prevents reloading 
//- captures value of input
//- calls oneLetter function to validate input
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); //stop form reloading
    inputLetter.focus();
    guessMessage.innerText = ""; //clear message text, ready for a new message
    // letter entered into input
    const letterGuess = inputLetter.value;
    // validate entered letter is only one letter
    const correctGuess = oneLetter(letterGuess);
    console.log(correctGuess);
    // call make Guess function if correctGuess has a valid result
    if (correctGuess) {
        makeGuess(correctGuess);
    } 
    //clear inputted letter
    inputLetter.value = "";
});

//function to check the input is one letter only
//-displays message if input is invalid
const oneLetter = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        guessMessage.innerText = "Enter a letter";
    } else if (input.length > 1) {
        guessMessage.innerText = "Enter one letter only";
    } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = "Enter a letter between A and Z";
    } else {
        //input is one letter between A and Z
        return input;
    }
};

//function that accepts the one letter output from OneLetter function as a parameter
const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        guessMessage.innerText = "You've already entered that letter. Try again.";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
        showGuessedLetters();
        guessesRemaining(letter);
        updateWordInProgress(guessedLetters);
    }
}

//function that displays the guessed letters
const showGuessedLetters = function () {
    //empty the inner html of the unordered list so that the player's letters can be added
    guessedLettersElement.innerHTML = "";
    //create new list item to hold each letter inside guessedLetters array, add letter to list item
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//function that shows guessed letters updating the word in progress
const updateWordInProgress = function (guessedLetters) {
    console.log(`this is guessedLetters`);
    console.log(guessedLetters);
    //update word being guessed to uppercase
    const wordUpper = word.toUpperCase();
    console.log(`this is word`);
    console.log(word);
    //convert word to be guessed into an array
    const wordArray = wordUpper.split("");
    console.log(`this is wordArray`);
    console.log(wordArray);
    //declare array to hold updated letters
    const matchArray = [];
    for (const letter of wordArray) { 
        if (guessedLetters.includes(letter)) {
            matchArray.push(letter.toUpperCase());
          } else {
            matchArray.push("●");
          }
    }
    wordInProgress.innerText = matchArray.join("");
    console.log(`this is matchArray`);
    console.log(matchArray);
    checkIfWon();
};

//function that counts number of remaining guesses
const guessesRemaining = function (letter) {
    const upperWord = word.toUpperCase();  
    //tell player if their guessed letter is in the word
    if (!upperWord.includes(letter)) {
        guessMessage.innerText = `Your guessed letter ${letter} is NOT in the word. Minus 1`
        remainingGuesses -= 1;
    } else {
        guessMessage.innerText = `Your letter ${letter} is IN the word!`
    }
    
    //tell playing how many guesses left
    if (remainingGuesses === 0) {
        guessMessage.innerText = `Sorry. Game over. The word is ${upperWord}`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesElement.innerText = `You have ONE guess left`;
    } else {
        remainingGuessesElement.innerText= `${remainingGuesses} guesses left`;   
    }   
};

//function to check if player has won
const checkIfWon = function() {
    if (wordInProgress.innerText === word.toUpperCase()) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    } 
};

//function updating GUI so that player can start over
const startOver = function() {
    //hide guess button, paragraph where remaining guesses display, unordered list showing guessed letters
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    //show Play Again button
    playAgainButton.classList.remove("hide");
    playAgainButton.focus();
}

// click event listener for the play again button
playAgainButton.addEventListener("click", function (e) {
    guessMessage.classList.remove("win"); 
    guessMessage.innerText = ""; 
    guessedLettersElement.innerHTML = ""; 
    remainingGuesses = 8; 
    guessedLetters = []; 
    remainingGuessesElement.innerText= `You have ${remainingGuesses} guesses left` 
    getWord();
    guessButton.classList.remove("hide"); 
    remainingGuessesElement.classList.remove("hide"); 
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide"); 
});