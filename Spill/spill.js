let countdown;
let playerScore = 0;
let botScore = 0;
let allowChoice = false;

const winSound = new Audio('sounds/win.mp3');
const loseSound = new Audio('sounds/lose.mp3');
const tieSound = new Audio('sounds/tie.mp3');

function makeChoice(playerChoice) {
    if (!allowChoice) {
        document.getElementById("result").textContent = "For tidlig! Bot vinner denne runden.";
        botScore++;
        updateScore();
        loseSound.play();
        if (botScore === 2) {
            setTimeout(() => {
                alert("Beklager, bot vant.");
                location.reload();
            }, 500);
        } else {
            clearInterval(countdown); 
            startCountdown();
        }
        return;
    }
    clearTimeout(countdown);

    const botChoice = getBotChoice();
    if (playerChoice === botChoice) {
        tieSound.play();
        document.getElementById("result").textContent = "Uavgjort!";
        setTimeout(() => {
            startCountdown();
        }, 500);
    } else if (isPlayerWinner(playerChoice, botChoice)) {
        playerScore++;
        winSound.play();
        updateScore();
        document.getElementById("result").textContent = "Du vant denne runden!";
        if (playerScore === 2) {
            setTimeout(() => {
                alert("Gratulerer! Du vant.");
                location.reload();
            }, 500);
        } else {
            setTimeout(() => {
                startCountdown();
            }, 500);
        }
    } else {
        botScore++;
        loseSound.play();
        document.getElementById("result").textContent = "Bot vant denne runden.";
        if (botScore === 2) {
            setTimeout(() => {
                alert("Beklager, bot vant.");
                location.reload();
            }, 500);
        } else {
            setTimeout(() => {
                startCountdown();
            }, 500);
        }
    }
}

function startCountdown() {
    let timer = 3;
    allowChoice = false;
    document.getElementById("timer").textContent = timer;
    countdown = setInterval(() => {
        timer--;
        if (timer === 1) {
            allowChoice = true;
        }
        document.getElementById("timer").textContent = timer;
        if (timer === 0) {
            clearInterval(countdown);
            if (allowChoice) {
                document.getElementById("result").textContent = "For sent! Bot vinner denne runden.";
                botScore++;
                updateScore();
                loseSound.play();
                if (botScore === 2) {
                    setTimeout(() => {
                        alert("Beklager, bot vant.");
                        location.reload();
                    }, 500);
                } else {
                    startCountdown();
                }
            }
        }
    }, 1000);
}

function updateScore() {
    document.getElementById("score").textContent = `${playerScore} - ${botScore}`;
}

document.getElementById("startGame").addEventListener("click", function() {
    updateScore();
    startCountdown();
    this.style.display = 'none';
});

function getBotChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function isPlayerWinner(playerChoice, botChoice) {
    if (playerChoice === "rock" && botChoice === "scissors") return true;
    if (playerChoice === "paper" && botChoice === "rock") return true;
    if (playerChoice === "scissors" && botChoice === "paper") return true;
    return false;
}
