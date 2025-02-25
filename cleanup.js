import { easy, medium, hard} from "./data/data.js";

const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const timer = document.getElementById("timer");
const userDifficultyInput = document.getElementById("userSelect"); 
const quoteError = document.getElementById("user-error");
const userAccuracy = document.getElementById("user-accuracy");

let userSelection = '';
let difficulty = '';

const arrayQuote = quoteDisplay.querySelectorAll("span");
const arrayValue = quoteInput.value.split("");
let startTime;

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

function getQuote(quotes) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(randomQuote);
    return randomQuote;
  }

  function getNextQuote() {
  const quote = getQuote(difficulty);
  quoteDisplay.innerHTML = "";
  console.log(quote);

  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    console.log(characterSpan);
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });
  quoteInput.value = null;
  startTimer();
}

function startSpeedTest() {
//   // listens for a anykey 
//   // p tag "press Enter key to start"
//   //following gets difficulty selection from user
    let userSelection = userDifficultyInput.value;

//   // WHEN the start keydown is pressed at that point it checks for difficulty and then renders to page
//i know the following line is wrong lol
  document.addEventListener('keydown', (key) => {
    if (key.value === "Enter") {
      let userSelection;
      if (userDifficultyInput.value === 'easy') {
          difficulty = easy; //<= imported data  
    } else if (userDifficultyInput.value === 'medium') {
          difficulty = medium; //<= imported data
    } else if (userDifficultyInput.value ==='hard') {
          difficulty = hard;
    } else {
      console.log('error');
      return;
}
getNextQuote();
}})}

function checkingQuoteInput() {
    let typedCharacter = 0;
    let userError = 0;
    let totalUserError = 0;
    let correct = true;
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
    
    if (correct) getNextQuote();

    quoteError.textContent = totalUserError + userError;
    let correctQuoteCharacters = (typedCharacter - (totalUserError + userError));
    let accuracy = ((correctQuoteCharacters/ typedCharacter) * 100);
    userAccuracy.textContent = Math.round(accuracy);
    if (quoteInput.length == arrayQuote.length) {
      getNextQuote();
      totalUserError += userError;
  }
  }