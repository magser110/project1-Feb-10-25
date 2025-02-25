import { easy, medium, hard} from "./data/data.js";

const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const timer = document.getElementById("timer");
const userDifficultyInput = document.getElementById("userSelect"); 
const quoteError = document.getElementById("user-error");
const userAccuracy = document.getElementById("user-accuracy");
let timerStarted = false;


let difficulty = easy;
let startTime;




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
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
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

    let typedCharacter = 0;
    let userError = 0;
    let totalUserError = 0;
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

    if (typedCharacter > 0) {
    let correctQuoteCharacters = (typedCharacter - (totalUserError + userError));
    let accuracy = ((correctQuoteCharacters/ typedCharacter) * 100);
    userAccuracy.textContent = Math.round(accuracy);
    } else {
      userAccuracy.textContent = 0;
    }
    if (arrayValue.length === arrayQuote.length) {
      getNextQuote();
      totalUserError += userError;
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

  getNextQuote();
}

document.addEventListener("DOMContentLoaded", startSpeedTest);