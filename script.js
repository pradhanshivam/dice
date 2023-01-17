"use strict";

// buttons
const btnNewGame = document.querySelector(".new-game");
const btnRollDice = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");
const btnInfo = document.querySelector(".info");
const btnCancel = document.querySelector(".cancel");
const btnPlay = document.querySelector(".play");
const btnReset = document.querySelector(".reset-game");
const btnQuit = document.querySelector(".quit-game");
const btnReplay = document.querySelector(".replay-game");

// dice
const dice = document.querySelector(".dice");

//quit
const nothing = document.querySelector(".nothing");

//rules
const rules = document.querySelector(".Rules");

// span info
const targetScore = document.querySelector(".target");
const winnerName = document.querySelector(".winner-name");
const palyer1FinalScore = document.querySelector(".player1-final-score");
const palyer2FinalScore = document.querySelector(".player2-final-score");

//starting popup
const firstPlayerName = document.querySelector("#first-player");
const secondPlayerName = document.querySelector("#second-player");
const setTarget = document.querySelector("#Score");

// arrays
const playerName = document.querySelectorAll(".player-name");
const player = document.querySelectorAll(".player");
const totalScore = document.querySelectorAll(".score");
const currentScore = document.querySelectorAll(".current-score");

//element names
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const winner = document.querySelector(".winner");

// starting-reset
const starter = function () {
  body.classList.add("body");
  header.classList.remove("hidden");
  main.classList.add("hidden");
  rules.classList.add("hidden");
  overlay.classList.add("hidden");
  winner.classList.add("hidden");
  nothing.classList.add("hidden");
};
starter();

let scoreTarget;

const addText = function (text) {
  const element = document.getElementById("id");
  element.textContent = text;
};

btnPlay.addEventListener("click", function () {
  if (firstPlayerName.value && secondPlayerName.value) {
    if (setTarget.value) {
      playerName[0].textContent = firstPlayerName.value;
      playerName[1].textContent = secondPlayerName.value;
      targetScore.textcontent = scoreTarget = +setTarget.value;

      body.classList.remove("body");
      header.classList.add("hidden");
      main.classList.remove("hidden");
      targetScore.innerText = setTarget.value;
    } else {
      addText("Enter Score value");
    }
  } else {
    addText("Enter Both Players Name");
  }
});

// starter-restart
let score, activePlayer, current, playing;

const inital = () => {
  score = [0, 0];
  activePlayer = 0;
  current = 0;
  playing = true;

  overlay.classList.add("hidden");
  winner.classList.add("hidden");
  dice.classList.add("hidden");

  for (let i = 0; i < totalScore.length; i++) {
    totalScore[i].innerHTML = score[i];
  }
  for (let i = 0; i < currentScore.length; i++) {
    currentScore[i].innerHTML = current;
  }
  player[0].classList.add("player-active");
  player[1].classList.remove("player-active");
};
inital();

//switch player function
/* .toggle(element) ->  agr wo element ha udr to hata dega warna element dal dega */
const switchPlayer = function () {
  current = 0;
  currentScore[activePlayer].textContent = current;
  player[0].classList.toggle("player-active");
  player[1].classList.toggle("player-active");
  activePlayer = activePlayer === 1 ? 0 : 1;
};

// dice roll function
btnRollDice.addEventListener("click", function () {
  // random dice generate
  if (playing) {
    let diceValue = Math.trunc(Math.random() * 6) + 1;

    // display corresponding dice
    dice.src = `images/dice-${diceValue}.png`;
    dice.classList.remove("hidden");

    // check diceValue is 1 or different
    if (diceValue !== 1) {
      current += diceValue;
      currentScore[activePlayer].textContent = current;
    } else {
      switchPlayer();
    }
  }
});

// btnHold button function
btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += current;
    totalScore[activePlayer].textContent = score[activePlayer];
    /*
  dynamically selecting above expression if players have( score-0 or score-1) respectively as two different clases instead of (.score) as one class for score value for both class
  document.querySelector(`.score-${activePlayer}`).textcontent = score[activePlayer];
  */
    if (score[activePlayer] >= scoreTarget) {
      currentScore[activePlayer].innerHTML = 0;

      winnerName.textContent = playerName[activePlayer].textContent;
      palyer1FinalScore.textContent = score[0];
      palyer2FinalScore.textContent = score[1];

      overlay.classList.remove("hidden");
      // main.classList.add("hidden");

      winner.classList.remove("hidden");
    } else {
      switchPlayer();
    }
  }
});

// btnNewgame button funcction
btnNewGame.addEventListener("click", inital);

//info button
btnInfo.addEventListener("click", function () {
  document.querySelector(".overlay").classList.remove("hidden");
  rules.classList.remove("hidden");
});

// popup cancel
btnCancel.addEventListener("click", function () {
  document.querySelector(".overlay").classList.add("hidden");
  rules.classList.add("hidden");
});

// reset game
const renew = function () {
  starter();
  inital();
};
btnReset.addEventListener("click", renew);

//replay game
btnReplay.addEventListener("click", inital);

//quit game
btnQuit.addEventListener("click", function () {
  playing = false;
  starter();
  header.classList.add("hidden");
  nothing.classList.remove("hidden");
});
