const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess"); 
const inputLetterGuess = document.querySelector(".letter");
const wordBeingGuessed = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numGuessesLeftDisplay = document.querySelector(".remaining span");
const message= document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const usedLetters = [];


const lettersUnknown = function (word) {
    const lettersNotKnown = [];
    for(const letter of word){
        console.log(letter);
        lettersNotKnown.push("●");
    }

    wordBeingGuessed.innerText  = lettersNotKnown.join("");
};

lettersUnknown(word);

button.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";

    const letterGuessed = inputLetterGuess.value; 
    const correctGuess = validate(letterGuessed); 

    if (correctGuess){
        makeGuess(letterGuessed);
    }

    inputLetterGuess.value = "";
}); 


const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    
    if (input.length === 0 ) {
        message.innerText = "pick a letter please"; 
    } else if ( input.length > 1) {
        message.innerText = "only one letter silly";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "has to be an actual letter";
    } else {
        return input; 
    }
}; 


const makeGuess = function (letterGuessed) {
  letterGuessed = letterGuessed.toUpperCase(); 
    if (usedLetters.includes(letterGuessed)) {
        message.innerText = "used that letter already";
    } else {

            usedLetters.push(letterGuessed);
            console.log(usedLetters);
            letterBeenGuessed();
            updateWordInProgress(usedLetters);
    }
};


const letterBeenGuessed = function () {
    guessedLetters.innerHTML = ""; 
    for (const letter of usedLetters){
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetters.append(li);
    }   
};


const updateWordInProgress = function (usedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const correctLetters = [];

    for (const letter of wordArray) {
        if (usedLetters.includes(letter)) {
            correctLetters.push(letter.toUpperCase());
        }else {
            correctLetters.push("●");
        }
    }
    //console.log(correctLetters);
    wordBeingGuessed.innerText = correctLetters.join("");
    didYouWin(); 
};


const didYouWin = function () {
    if (word.toUpperCase() === wordBeingGuessed.innerText) {
        message.classList.add ("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

