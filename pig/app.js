/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        // 1. Get a random number from 1 to 6.
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the corrresponding dice imgame.
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';
        // 3. Update the score in the "Current" box.
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score. 
            if (dice1 === 6 && dice2 === 6) {
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = 0;
                nextPlayer();
            }
            else {
                roundScore += dice1 + dice2;
                document.querySelector('#round-score-' + activePlayer).textContent = roundScore;
            }
        }
        else {
            // Other player's turn. 
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Add the current score to the total score. 
        scores[activePlayer] += roundScore;
        // 2. Update the total score UI.
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.goal-score').value;
        var winningScore;
        // 3. Check to see if the player won the game. 
        if (input) {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-box').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-box').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('round-score-0').textContent = 0;
    document.getElementById('round-score-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-box').classList.remove('winner');
    document.querySelector('.player-1-box').classList.remove('winner');
    document.querySelector('.player-0-box').classList.remove('active');
    document.querySelector('.player-1-box').classList.remove('active');
    document.querySelector('.player-0-box').classList.add('active');
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('round-score-0').textContent = '0';
    document.getElementById('round-score-1').textContent = '0';
    document.querySelector('.player-0-box').classList.toggle('active');
    document.querySelector('.player-1-box').classList.toggle('active');
}