// Approach
// 1. Creating random puzzles
// 1.1. Create an array of 16 elements, numbers 1-15 and a 'blank'.
// 1.2. Set each button to a random element from the array, removing that element, until all buttons are filled.

class Tile {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
}
  
let moves;

//Creates an array of the possible values a tile can have (numbers 1-15 and a blank).
function values() {
    const spots = [];
    for (let i = 1; i <=15; i ++) {
        spots.push(i);
    }
    spots.push('');
    return spots;
}

// Creates an array with the random order of the values for each tile.
function order(arr) {
    let or = [];
    for (i = 0; i < 16; i ++) {
        let index = getRandom(arr.length);
        let value = arr[index];
        or.push(value);
        arr.splice(index, 1);
    }
    return or;
}

// Returns a random number from 0 to 15. Used to get a random index. 
function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Creates new board.
function createBoard(ord, grid) {
    clearBoard();
    //const vals = values();
    //const ord = order(vals);
    //const grid = document.querySelector('.grid');
    for (let i = 0; i < ord.length; i ++) {
      let box = document.createElement('button');
      if (ord[i] === "") {
        box.setAttribute('id', 'empty');
      }
      else {
          box.setAttribute('id', i);
      }
      box.addEventListener('click', function() {
            const i = eval(box.getAttribute('id'));
            const x = getEmpty(ord, i);
            if (x != null) {
                swap(ord, i, x);
                moves ++;
                document.getElementById('moves').innerHTML=`${moves}`;
                if (gameWon(ord)) {
                    console.log('you win.')
                }
                createBoard(ord, grid);
            }
      })
      box.innerHTML = `${ord[i]}`;
      grid.appendChild(box);
    }
}

// Clears previous board. Used before drawing the next board.
function clearBoard() {
    document.getElementById('grid').innerHTML = '';
}

function getRight(arr, index) {
    if ((index + 1) % 4 === 0) {
      return null;
    }
    return arr[index + 1];
}
  
function getLeft(arr, index) {
    if (index % 4 === 0) {
      return null;
    }
    return arr[index - 1];
}
  
function getTop(arr, index) {
    if (index - 4 < 0) {
      return null;
    }
    return arr[index - 4];
}
  
function getBottom(arr, index) {
    if (index + 4 > 15) {
      return null;
    }
    return arr[index + 4];
}

function getEmpty(arr, index) {
    if (getRight(arr, index) == "") {
        return index + 1;
    }
    else if (getLeft(arr, index) == "") {
        return index - 1;
    }
    else if (getTop(arr, index) == "") {
        return index - 4;
    }
    else if (getBottom(arr, index) == "") {
        return index + 4;
    }
    return null;
}

function swap(arr, index1, index2) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function startTimer() {
    clearInterval();
    let seconds = 0;
    setInterval(function() {
        seconds ++;
        document.getElementById('seconds').innerHTML = style(seconds%60);
        document.getElementById('minutes').innerHTML = style(parseInt(seconds/60));
    }, 1000);
}

function clearTimer(interval) {
    clearInterval(interval);
}

function style(time) {
    let timeString = time + '';
    if (timeString.length < 2) {
        return `0${timeString}`;
    }
    return timeString;
}

function gameWon(ord) {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
    for (let i = 0; i < arr.length; i ++) {
        if (ord[i] !== arr[i]) {
            return false;
        }
    }
    return true;
}

moves = 0;
document.getElementById('moves').innerHTML=`${moves}`;
const vals = values();
const ord = order(vals);
grid = document.querySelector('.grid');
createBoard(ord, grid);
document.querySelector('.play-btn').addEventListener('click', init);
 
function init() {
    const vals = values();
    const ord = order(vals);
    grid = document.querySelector('.grid');
    createBoard(ord, grid);
    moves = 0;
    document.getElementById('moves').innerHTML=`${moves}`;
}