'use strict';
// selecting content
const score0El = document.querySelector('#score--0');
const  score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0')
const current1El = document.querySelector('#current--1')
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

// starting conditions
let score, currentScore, activePlayer, playing;

const init = function(){
score = [0, 0];
currentScore = 0;
activePlayer = 0;
playing = true;

current0El.textContent = 0;
current1El.textContent = 0;
score0El.textContent= 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');
player0El.classList.remove('player--winner');
player1El.classList.remove('player--winner');
player0El.classList.add('player--active');
player1El.classList.remove('player--active');
};
init();

const switchPlayer = function(){
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

rollBtn.addEventListener('click',
function(){
  if(playing){
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    if(diceRoll !== 1){
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else{
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', 
function(){
  if(playing){

  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];


  if(score[activePlayer] >= 20){
    playing = false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  } else{
    switchPlayer();
  }
}
});

btnNew .addEventListener('click', init);