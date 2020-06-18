var roundScore, activePlayer, gamePlaying, previousScores;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {

        var dice = [0, 0, 0, 0, 0];

        var numDice = document.querySelector('.number-of-dice').value;

        if (document.getElementById('free-bacon').checked) {
            if (numDice == 0) {
                scores[activePlayer] += altDiff(scores[otherPlayer(activePlayer)]);
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            }
        }

        for (let i = 0; i < numDice; i ++) {
            var d = Math.floor(Math.random() * 6) + 1;
            dice[i] = d;
        }

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-3').style.display = 'block';
        document.getElementById('dice-4').style.display = 'block';
        document.getElementById('dice-5').style.display = 'block';

        var num = 1;
        for (let j = 0; j < dice.length; j ++ ) {
            if (dice[j] === 0) {
                document.getElementById('dice-' + num).style.display = 'none';
            }
            else {
                document.getElementById('dice-' + num).src = 'img/dice-' + dice[j] + '.png';
            }
            num ++;
        }

        var amount = 0;
        for (let k = 0; k < dice.length; k ++) {
            if (dice[k] === 1) {
                amount = 1;
                break;
            }
            else {
                amount += dice[k];
            }
        }

        scores[activePlayer] += amount;

        if (document.getElementById('feral-hogs').checked) {
            if (byTwo(previousScores[activePlayer], numDice)) {
                scores[activePlayer] += 3;
            }
        }

        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.goal-score').value;
        var winningScore;
        
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
            document.getElementById('dice-3').style.display = 'none';
            document.getElementById('dice-4').style.display = 'none';
            document.getElementById('dice-5').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-box').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-box').classList.remove('active');
            gamePlaying = false;
        }
        else {
            if (document.getElementById('swine-swap').checked) {
                if (swap(scores[activePlayer], scores[otherPlayer(activePlayer)])) {
                    var score = scores[activePlayer];
                    scores[activePlayer] = scores[otherPlayer(activePlayer)];
                    scores[otherPlayer(activePlayer)] = score;
                    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                    document.getElementById('score-' + otherPlayer(activePlayer)).textContent = scores[otherPlayer(activePlayer)];
                }
            }
            previousScores[activePlayer] = amount;
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    previousScores = [0, 0];
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('dice-3').style.display = 'none';
    document.getElementById('dice-4').style.display = 'none';
    document.getElementById('dice-5').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
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
    document.querySelector('.player-0-box').classList.toggle('active');
    document.querySelector('.player-1-box').classList.toggle('active');
}

function toArray(number) {
    var output = [], numString = number.toString();
    for (var i = 0; i < numString.length; i ++) {
        output.push(+numString.charAt(i));
    }
    return output;
}

function altDiff(score) {
    var x = 0, diff = 0, cubed = score * score * score,
    numArray = toArray(cubed);
    for (var i = 0; i < numArray.length; i ++) {
        if (x === 0) {
            diff += numArray[i];
            x = 1;
        }
        else {
            diff -= numArray[i];
            x = 0;
        }
    }
    return 1 + Math.abs(diff);
}

function otherPlayer(player) {
    return(player === 0 ? 1 : 0);
}

function swap(score1, score2) {
    var num = Math.pow(3, score1 + score2);
    var numString = num.toString();
    var first = +numString.charAt(0);
    var last = +numString.charAt(numString.length-1);
    return first === last;
}

function byTwo(prevScore, diceRolled) {
    var diff = Math.abs(prevScore - diceRolled);
    return diff === 2;
}