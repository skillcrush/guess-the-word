const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess"); 
const inputLetterGuess = document.querySelector(".letter");
const wordBeingGuessed = document.querySelector(".word-in-progress");
const remainingGuessesPart = document.querySelector(".remaining");
const numGuessesLeftDisplay = document.querySelector(".remaining span");
const message= document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const usedLetters = [];
let remainingGuesses = 8; 


const getWord = async function () {
    const newWord = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const data = await newWord.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    lettersUnknown(word);

};
getWord();



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
            countGuessesRemaining(letterGuessed)
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

const countGuessesRemaining = function(usedLetters) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(usedLetters)) {
        message.innerText = "incorrect guess one less try";
        remainingGuesses -= 1; 
    } else {
        message.innerText = "that correct! ";
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over, the word was ${word}`
    } else if (remainingGuesses === 1){
        numGuessesLeftDisplay.innerText = `${remainingGuesses} guess left`
        } else {
            numGuessesLeftDisplay.innerText = `${remainingGuesses} guesses left`
     }
};


const didYouWin = function () {
    if (word.toUpperCase() === wordBeingGuessed.innerText) {
        message.classList.add ("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

