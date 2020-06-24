var userScore = 0
var cpuScore = 0

function main() {
    document.getElementById("rock").addEventListener('click', () => game('rock'))
    document.getElementById("paper").addEventListener('click', () => game('paper'))
    document.getElementById("scissors").addEventListener('click', () => game('scissors'))
}

function game(userChoice) {
    const cpu = cpuChoice()
    const outcome = gameOutcome(userChoice, cpu)
    update(outcome, userChoice, cpu)
}

function cpuChoice() {
    const choices = ['rock', 'paper', 'scissors']
    return choices[Math.floor(Math.random() * choices.length)];
}

/** Returns:
 *  -> 1 if user wins
 *  -> -1 if user loses
 *  -> 0 if there is a tie
 */
function gameOutcome(user, cpu) {
    switch (user + cpu) {
        case 'paperrock':
        case 'rockscissors':
        case 'scissorspaper':
            return 1;
            break;
        case 'rockpaper':
        case 'scissorsrock':
        case 'paperscissors':
            return -1;
            break;
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
            return 0;
            break;
    }
}

function update(outcome, user, cpu) {
    u = user.charAt(0).toUpperCase() + user.slice(1)
    c = cpu.charAt(0).toUpperCase() + cpu.slice(1)
    var border
    const result = document.getElementById("result")
    const winner = document.getElementById("winner")    
    if (outcome === 1) {
        userScore++;
        document.getElementById("user-score").innerHTML = userScore
        result.innerHTML = `${u} (User) > ${c} (CPU)`
        winner.innerHTML = 'You Win!'
        border = 'win'
    }
    if (outcome === -1) {
        cpuScore++;
        document.getElementById("cpu-score").innerHTML = cpuScore
        result.innerHTML = `${u} (User) < ${c} (CPU)`
        winner.innerHTML = 'You Lose!'
        border = 'lose'
    }
    if (outcome === 0) {
        result.innerHTML = `${u} (User) = ${c} (CPU)`
        winner.innerHTML = 'Tie!'
        border = 'tie'
    }
    document.getElementById(user).classList.add(border)
    setTimeout(() => document.getElementById(user).classList.remove(border), 500)
}

main()