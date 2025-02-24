import { easy, medium, hard} from "./data/data.js";

 


const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const timer = document.getElementById("timer");
// research how to get user selection from user !!!!
//following calls difficulty elements from html
const userDifficultyInput = document.getElementById("userSelect"); 
const quoteError = document.getElementById("user-error");
const userAccuracy = document.getElementById("user-accuracy");


///which ever one they chose 
quoteInput.addEventListener("input", () => {
    const arrayQuote = quoteDisplay.querySelectorAll("span");
    const arrayValue = quoteInput.value.split("");
   // const userSelction = '';
    
    console.log(userDifficultyInput.value);
  // research how to get userDifficultyInput from user !!!!
  //following gets difficulty selection from user
    const difficultySelection = userDifficultyInput.ownerDocument.getSelection();
    //following store selection as a string
    const userSelection = difficultySelection.toString();
    //following logs input to console
    console.log(userSelection);

    // create a varible that can store userSelection(variable called selectedDifficulty)

      if (userDifficultyInput.value === 'easy') {
            userSelection = easy; //<= imported data
    } else if (userDifficultyInput.value === 'medium') {
            userSelection = medium; //<= imported data
    } else if (userDifficultyInput.value ==='hard') {
            userSelection = hard;
    } else console.log('error');

// option to add and delete scores 
// [{}] using amount of letters as 100% / time
  let typedCharacter = 0;
  let userError = 0;
  let totalUserError = 0;
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    //following is for quote to not have correct or incorrect values if user hasn't typed yet
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    }
    //following is checking if user input matches quote
    else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    }
    //following checks if user input is wrong
    else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
      userError++;
    }
  });
  if (correct) getNextQuote();
}

  //following gives # of errors
  quoteError.textContent = totalUserError + userError;
  //checking for accuracy
  let correctQuoteCharacters = (typedCharacter - (totalUserError + userError));
  let accuracy = ((correctQuoteCharacters/ typedCharacter) * 100);
  userAccuracy.textContent = Math.round(accuracy);

  //checking for text if typed
  if (quoteInput.length == character.length) {
    getNextQuote();

    //update total erros
    totalUserError += userError;
  });

function getQuote(quotes) {
  // following gets random quote from array
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  console.log(randomQuote);
  return randomQuote;
}

function getNextQuote() {
    //console.log(userSelection);
    
  const quote = getQuote(userSelection);
  //following is empty for usser input
  quoteDisplay.innerHTML = "";
  //following is splitting each letter from quote and creating a new span so we can check user input in the future(correct or incorrect)
  console.log(quote);

  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });
  quoteInput.value = null;
  startTimer();
}

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
