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
            clearTimeout(countdown);
            startCountdown();
        }
        return;
    }

    let choices = ['stein', 'saks', 'papir'];
    let botChoice = choices[Math.floor(Math.random() * 3)];
    clearTimeout(countdown);
    countdown = setTimeout(() => {
        let winner = getWinner(playerChoice, botChoice);
        if (winner === 'player') {
            playerScore++;
            winSound.play();
        } else if (winner === 'bot') {
            botScore++;
            loseSound.play();
        } else {
            tieSound.play();
        }
        updateScore();
        document.getElementById("result").textContent = `Du valgte: ${playerChoice}. Bot valgte: ${botChoice}. ${winner === 'tie' ? 'Uavgjort!' : winner === 'player' ? 'Du vant!' : 'Bot vant!'}`;

        if (playerScore === 2 || botScore === 2) {
            setTimeout(() => {
                alert(playerScore === 2 ? "Gratulerer, du vant!" : "Beklager, bot vant.");
                location.reload();
            }, 500);
        } else {
            startCountdown();
        }
    }, 3000);
}

function getWinner(playerChoice, botChoice) {
    if (playerChoice === botChoice) {
        return 'tie';
    }

    if (
        (playerChoice === 'stein' && botChoice === 'saks') ||
        (playerChoice === 'saks' && botChoice === 'papir') ||
        (playerChoice === 'papir' && botChoice === 'stein')
    ) {
        return 'player';
    }

    return 'bot';
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
            clearTimeout(countdown);
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
