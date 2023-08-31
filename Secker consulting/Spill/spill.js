let countdown;
let playerScore = 0;
let botScore = 0;

function makeChoice(playerChoice) {
    let choices = ['stein', 'saks', 'papir'];
    let botChoice = choices[Math.floor(Math.random() * 3)];
    clearTimeout(countdown);
    countdown = setTimeout(() => {
        let winner = getWinner(playerChoice, botChoice);
        if (winner === 'player') {
            playerScore++;
        } else if (winner === 'bot') {
            botScore++;
        }

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
    document.getElementById("timer").textContent = timer;
    countdown = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer;
        if (timer === 0) {
            clearTimeout(countdown);
            document.getElementById("result").textContent = "For sent! Bot vinner denne runden.";
            botScore++;
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

document.getElementById("startGame").addEventListener("click", function() {
    // Starter nedtellingen når knappen trykkes
    startCountdown();

    // Skjuler knappen etter at den er trykket
    this.style.display = 'none';
});
