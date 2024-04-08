const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const choices = ['rock', 'paper', 'scissors'];
let userScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie!";
    }

    if ((userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'rock')) {
        userScore++;
        return "You win!";
    } else {
        computerScore++;
        return "You lose!";
    }
}

function playRound(rounds) {
    if (roundsPlayed < rounds) {
        rl.question('Choose rock, paper, or scissors: ', (userChoice) => {
            userChoice = userChoice.toLowerCase();
            if (!choices.includes(userChoice)) {
                console.log("Invalid choice, please choose rock, paper, or scissors.");
                playRound(rounds); // Ask again without incrementing roundsPlayed
                return;
            }

            const computerChoice = getComputerChoice();
            console.log(`Round ${roundsPlayed + 1}: You chose ${userChoice}, the computer chose ${computerChoice}.`);
            console.log(determineWinner(userChoice, computerChoice));

            roundsPlayed++;
            console.log(`Score: You ${userScore} - Computer ${computerScore}\n`);
            playRound(rounds); // Proceed to next round
        });
    } else {
        console.log(`Game Over! Final Score: You ${userScore} - Computer ${computerScore}`);
        askToPlayAgain();
    }
}

function askForRounds() {
    rl.question('How many rounds would you like to play? ', (input) => {
        const rounds = parseInt(input);
        if (isNaN(rounds) || rounds <= 0) {
            console.log("Please enter a valid number of rounds.");
            askForRounds();
        } else {
            playRound(rounds);
        }
    });
}

function askToPlayAgain() {
    rl.question('Do you want to play again? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            userScore = 0;
            computerScore = 0;
            roundsPlayed = 0;
            askForRounds();
        } else if (answer.toLowerCase() === 'no') {
            console.log("Thank you for playing. Goodbye!");
            rl.close();
        } else {
            console.log("Invalid answer. Please type 'yes' or 'no'.");
            askToPlayAgain();
        }
    });
}

console.log("Welcome to Rock, Paper, Scissors!");
askForRounds();
