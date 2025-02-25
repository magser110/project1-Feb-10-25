import { easy, medium, hard} from "./data/data.js";

const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const timer = document.getElementById("timer");
const userDifficultyInput = document.getElementById("userSelect"); 
const quoteError = document.getElementById("user-error");
const userAccuracy = document.getElementById("user-accuracy");
let timerStarted = false;
let totalUserError = 0;
let totalAccuracy = 100;
let totalCharactersTyped = 0; 
let difficulty = easy;
let time = 0;




function updateDifficulty(){
  const userSelection = userDifficultyInput.value;
  if (userSelection === 'easy') {
        difficulty = easy;   
  } else if (userSelection === 'medium') {
        difficulty = medium; 
  } else if (userSelection ==='hard') {
        difficulty = hard;
  }
}

function getQuote(quotes) {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  console.log(randomQuote);
  return randomQuote;
}

function startTimer() {
  timer.innerText = 0;
  setInterval(() => {
    time += 1;
    timer.innerText = time;
  }, 1000);
}


  function getNextQuote() {
  const quote = getQuote(difficulty);
  quoteDisplay.innerHTML = "";
  console.log(quote);

  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });
  quoteInput.value = null;
}


function checkingQuoteInput() {
    const arrayQuote = quoteDisplay.querySelectorAll("span");
    const arrayValue = quoteInput.value.split("");

    let typedCharacter = arrayValue.length;
    let userError = 0;
    let accuracy = 100
    
    let correct = false;

    arrayQuote.forEach((characterSpan, index) => {
      const character = arrayValue[index];
       if (character == null) {
        characterSpan.classList.remove("correct");
        characterSpan.classList.remove("incorrect");
        correct = false;
      }
      else if (character === characterSpan.innerText) {
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
      }
      else {
        characterSpan.classList.remove("correct");
        characterSpan.classList.add("incorrect");
        correct = false;
        userError++;
      }
    });

    quoteError.textContent = totalUserError + userError;
    
    if (arrayValue.length === arrayQuote.length) {
      if(typedCharacter >0 ){
        let correctQuoteCharacters = (typedCharacter -  userError);
        accuracy = ((correctQuoteCharacters/ typedCharacter) * 100);
        accuracy = Math.max(0, Math.min(100, accuracy));
      }

      totalUserError += userError;
      totalCharactersTyped += typedCharacter

     if(totalCharactersTyped > 0 ){
      const totalCorrectCharacters = totalCharactersTyped - totalUserError;
      totalAccuracy = (totalCorrectCharacters / totalCharactersTyped) * 100;
      totalAccuracy = Math.max(0, Math.min(100, totalAccuracy));
      userAccuracy.textContent = Math.round(totalAccuracy) + '%'
     }

      getNextQuote();
  }
}

function startSpeedTest() {
  userDifficultyInput.addEventListener('change', () => {
  updateDifficulty();
  getNextQuote();
  })

  updateDifficulty();
  getNextQuote();
  quoteInput.addEventListener("input", () => {
    if (!timerStarted) {
      timerStarted = true;
      startTimer();
    }
    checkingQuoteInput();
  });
}

document.addEventListener("DOMContentLoaded", startSpeedTest);

function restartGame() {
  timerStarted = false;
  totalCharactersTyped = 0;
  totalAccuracy = 0; 
  totalUserError = 0;
}