"use strict";

// selecting elements
let player0 = document.querySelector(".player--0");
let player1 = document.querySelector(".player--1");

let score0 = document.querySelector("#score--0");
let score1 = document.querySelector("#score--1");

let current0 = document.querySelector("#current--0");
let current1 = document.querySelector("#current--1");

let dice = document.querySelector(".dice");

let newBtn = document.querySelector(".btn--new");
let rollBtn = document.querySelector(".btn--roll");
let holdBtn = document.querySelector(".btn--hold");
// console.log("🚀 ~ randomDice:", randomDice);

// setting scores to zero
const changeScore = function (score) {
  score0.textContent = score;
  score1.textContent = score;
};
changeScore(0);

// hiding dice element
const hiddingDice = function () {
  dice.classList.add("hidden");
};
hiddingDice();

// switching Players
const switchingPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

let totalScores;
let currentScore;
let activePlayer;
//state variable (make all buttons idle)
let playing;

const init = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};
init();

rollBtn.addEventListener("click", function () {
  if (playing) {
    // genrate random dice
    let randomDice = Math.trunc(Math.random() * 6) + 1;

    // show the dice
    dice.classList.remove("hidden");
    dice.src = `dice-${randomDice}.png`;

    //check if value is 1
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      //switch to next player
    } else {
      switchingPlayers();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    //adding the current to total score
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    //checking if there is a winner (value = 100)
    if (totalScores[activePlayer] >= 100) {
      playing = false;
      hiddingDice();
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.querySelector(`#name--${activePlayer}`).textContent = `🎉🎉🎉`;
      //switching players
    } else {
      switchingPlayers();
    }
  }
});

newBtn.addEventListener("click", function () {
  //visible changes
  changeScore(0);
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  document.querySelector(`#name--${activePlayer}`).textContent = `Player ${activePlayer + 1}`;

  player0.classList.add("player--active");
  player1.classList.remove("player--active");

  hiddingDice();

  //internal changes
  init();
});
