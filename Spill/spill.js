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
            clearInterval(countdown);  // Using clearInterval
            if (allowChoice) {  // Check if player hasn't chosen
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

// ... rest of the code remains the same.


function updateScore() {
    document.getElementById("score").textContent = `${playerScore} - ${botScore}`;
}

document.getElementById("startGame").addEventListener("click", function() {
    updateScore();
    startCountdown();
    this.style.display = 'none';
});
