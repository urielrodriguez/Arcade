/***************************
* VARIABLES
****************************/

const scoreDisplay = document.getElementById('score');
const width = 28; // The width of the grid
let score = 0;
const grid = document.querySelector('.grid');
// Legend
// - 0: coin -> ball
// - 1: wall
// - 2: ghost cave
// - 3: power coin -> glove
// - 4: empty 
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

/***************************
* GRID CREATION & DISPLAY
****************************/

const boxes = [];

function drawGrid() {
    for (let i = 0; i < layout.length; i++) {
        const box = document.createElement('div');
        grid.appendChild(box);
        boxes.push(box);
        if (layout[i] === 0) {
            boxes[i].classList.add('ball');
            const ball = document.createElement('img');
            ball.src = './img/ball.png';
            ball.setAttribute('id', i);
            box.appendChild(ball);
        }
        else if (layout[i] === 1) {
            boxes[i].classList.add('wall');
        }
        else if (layout[i] === 2) {
            boxes[i].classList.add('ghost-cave');
        }
        else if (layout[i] === 3) {
            boxes[i].classList.add('glove');
            const glove = document.createElement('img');
            glove.src = './img/glove.png';
            glove.setAttribute('id', i);
            box.appendChild(glove);
        }
    }
}

drawGrid()

/***************************
* PACMAN FUNCTIONALITY
****************************/

let pacmanPos = 490;
boxes[pacmanPos].classList.add('pacman');
const la = document.createElement('img');
la.src = './img/lad.png';
la.setAttribute('id', 'la')
boxes[pacmanPos].appendChild(la);

function movePacman(e) {
    boxes[pacmanPos].classList.remove('pacman')
    let dodgers = document.getElementById('la');
    dodgers.parentNode.removeChild(dodgers)
    switch(e.keyCode) {
        // Left Arrow Key
        case 37:
            if (!boxes[pacmanPos - 1].classList.contains('wall') && !boxes[pacmanPos - 1].classList.contains('ghost-cave')) {
                pacmanPos -= 1;
            }
            if (pacmanPos - 1 === 363) {
                pacmanPos = 391;
            }
            break;
        // Up Arrow Key
        case 38:
            if (!boxes[pacmanPos - width].classList.contains('wall') && !boxes[pacmanPos - width].classList.contains('ghost-cave')) {
                pacmanPos -= width;
            }
            break;
        // Right Arrow Key
        case 39:
            if (!boxes[pacmanPos + 1].classList.contains('wall') && !boxes[pacmanPos + 1].classList.contains('ghost-cave')) {
                pacmanPos += 1;
            }
            if (pacmanPos + 1 === 392) {
                pacmanPos = 364;
            }
            break;
        // Down Arrow Key
        case 40:
            if (!boxes[pacmanPos + width].classList.contains('wall') && !boxes[pacmanPos + width].classList.contains('ghost-cave')) {
                pacmanPos += width
            }
            break;
    }
    boxes[pacmanPos].classList.add('pacman');  
    const la = document.createElement('img');
    la.src = './img/lad.png';
    la.setAttribute('id', 'la');
    boxes[pacmanPos].appendChild(la);

    baseballEaten();
    gloveEaten();
    gameOver();
    win();
}

document.addEventListener('keydown', movePacman);

/***************************
* COIN DISPLAY
****************************/

function baseballEaten() {
    if (boxes[pacmanPos].classList.contains('ball')) {
        boxes[pacmanPos].classList.remove('ball');
        let ball = document.getElementById(pacmanPos);
        ball.parentNode.removeChild(ball);
        score ++;
        scoreDisplay.innerHTML = score;
    }
}

function gloveEaten() {
    if (boxes[pacmanPos].classList.contains('glove')) {
        boxes[pacmanPos].classList.remove('glove');
        let glove = document.getElementById(pacmanPos);
        glove.parentNode.removeChild(glove);
        score += 10;
        scoreDisplay.innerHTML = score;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhosts, 10000);
    }
}

/***************************
* GHOST FUNCTIONALITY
****************************/

class Ghost {
    constructor(id, img, startIndex, speed) {
        this.id = id;
        this.img = img;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.timerId = NaN;
        this.isScared = false;
    }
}

ghosts = [
    new Ghost('az', './img/az.png', 293, 250),
    new Ghost('col', './img/col.png', 376, 400),
    new Ghost('sd', './img/sd.png', 351, 300),
    new Ghost('sf', './img/sf.png', 294, 500)
]

// Draws ghosts
ghosts.forEach(ghost => {
    boxes[ghost.currentIndex].classList.add('ghost');
    const rival = document.createElement('img');
    rival.src = ghost.img;
    rival.setAttribute('id', ghost.id);
    boxes[ghost.currentIndex].appendChild(rival);
})

// Moves ghosts
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
    let direction = randomMove();
    ghost.timerId = setInterval(() => {
        if (!boxes[ghost.currentIndex + direction].classList.contains('ghost') && !boxes[ghost.currentIndex + direction].classList.contains('wall')) {
            // Remove ghost image
            boxes[ghost.currentIndex].classList.remove('ghost');
            boxes[ghost.currentIndex].classList.remove('scared-ghost');
            let rival = document.getElementById(ghost.id);
            rival.parentNode.removeChild(rival);
            // Draw ball image
            if (boxes[ghost.currentIndex].classList.contains('ball')) {
                let ball = document.createElement('img');
                ball.src = './img/ball.png';
                ball.setAttribute('id', ghost.currentIndex);
                boxes[ghost.currentIndex].appendChild(ball);
            }
            // Change direction
            ghost.currentIndex += direction;
            // Draw ghost image
            boxes[ghost.currentIndex].classList.add('ghost');
            let team = document.createElement('img');
            team.src = ghost.img;
            team.setAttribute('id', ghost.id);
            boxes[ghost.currentIndex].appendChild(team);
            // Remove ball image
            if (boxes[ghost.currentIndex].classList.contains('ball')) {
                let baseball = document.getElementById(ghost.currentIndex);
                baseball.parentNode.removeChild(baseball);
            }
        }
        else {
            direction = randomMove();
        }
        if (ghost.isScared) {
            boxes[ghost.currentIndex].classList.add('scared-ghost');
        }
        if (ghost.isScared && boxes[ghost.currentIndex].classList.contains('pacman')) {
            boxes[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            boxes[ghost.currentIndex].classList.add('ghost');
        }
    }, ghost.speed)
}

/***************************
* GAME STATE FUNCTIONS
****************************/

// Checks if the game is over
// Game is over when a ghost collides with pacman
function gameOver() {
    if (boxes[pacmanPos].classList.contains('ghost') && !boxes[pacmanPos].classList.contains('scared-ghost')) {
        const resultRight = document.querySelector('.result-right');
        const resultLeft = document.querySelector('.result-left');
        resultRight.setAttribute('id', 'game-over');
        resultLeft.setAttribute('id', 'game-over');
        resultRight.innerHTML = 'Game Over';
        resultLeft.innerHTML = 'Game Over';
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keydown', movePacman);
    }
}

// Checks if the game has been won
// Max score is 274
function win() {
    if (score === 274) {
        const resultRight = document.querySelector('.result-right');
        const resultLeft = document.querySelector('.result-left');
        resultRight.setAttribute('id', 'win');
        resultLeft.setAttribute('id', 'win');
        resultRight.innerHTML = 'You Win!';
        resultLeft.innerHTML = 'You Win!';
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keydown', movePacman);
    }
}

/***************************
* HELPER FUNCTIONS
****************************/

// Returns a random direction
// Options: Up, Down, Left, Right
// Used in moveGhost function
function randomMove() {
    const directions = [-1, +1, width, -width];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    return direction
}

function smartMove() {
    
}

// Returns ghost to their normal un-scared state
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
}