'use strict';

// element selections
const
    player0Element = document.querySelector('.player--0'),
    player1Element = document.querySelector('.player--1'),
    score0Element = document.querySelector('#score--0'),
    current0Element = document.querySelector('#current--0'),
    score1Element = document.querySelector('#score--1'),
    current1Element = document.querySelector('#current--1'),
    diceElement = document.querySelector('.dice'),
    btnRestart = document.querySelector('.btn--new'),
    btnRoll = document.querySelector('.btn--roll'),
    btnHold = document.querySelector('.btn--hold');
let totalScores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let isPlaying = true;

// game initial conditions
const initialConditions = () => {
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current1Element.textContent = 0;
    current0Element.textContent = 0;
    diceElement.classList.add('hidden');
    totalScores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    isPlaying = true;
    document.querySelector(`#name--0`).textContent = `Игрок 1!`;
    document.querySelector(`#name--1`).textContent = `Игрок 2!`;
    player0Element.classList.remove('player--active');
    player1Element.classList.remove('player--active');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
};
initialConditions();

const changePlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`)
        .textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};

// Roll the dice 
btnRoll.addEventListener('click', () => {
    if (isPlaying) {
        // 1. Generete a random number 
        const diceNumber = Math.trunc(Math.random() * 6) + 1;

        // 2. Display number on the dice
        diceElement.classList.remove('hidden');
        diceElement.src = `img/dice${diceNumber}.png`;

        // 3. If the number is 1, switch to the next player, if not - add number to the current score
        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`)
                .textContent = currentScore;
        } else {
            changePlayer();
        }
    }
});

// Save the scores
btnHold.addEventListener('click', () => {
    if (isPlaying) {
        totalScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];
        if (totalScores[activePlayer] >= 20) {
            isPlaying = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            document
                .querySelector(`#name--${activePlayer}`).textContent = `Победа!`;

            diceElement.classList.add('hidden');
        } else {
            changePlayer();
        }
    }

});

// Restart the play
btnRestart.addEventListener('click', initialConditions);