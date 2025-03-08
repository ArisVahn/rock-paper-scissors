document.addEventListener("DOMContentLoaded", function () {
    let humanScore = 0;
    let computerScore = 0;
    const choices = ["Rock", "Paper", "Scissors"];
    const resultElement = document.getElementById("result");
    const humanScoreElement = document.getElementById("human-score");
    const computerScoreElement = document.getElementById("computer-score");
    const newGameButton = document.getElementById("new-game");
    const gameButtons = document.querySelectorAll(".choice-button");
    const toggleThemeButton = document.getElementById("toggle-theme");
    const fullscreenButton = document.getElementById("fullscreen-btn");

    const themes = {
        light: "light-mode",
        dark: "dark-mode",
    };
    let currentTheme = "light";

    function getComputerChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function displayResult(resultMessage) {
        resultElement.textContent = resultMessage;
    }

    function updateScore() {
        humanScoreElement.textContent = `Human: ${humanScore}`;
        computerScoreElement.textContent = `Computer: ${computerScore}`;
    }

    function checkWinner() {
        if (humanScore === 5) {
            displayResult("🎉 Congratulations! You won the game!");
            disableButtons();
            newGameButton.classList.add('visible');
        } else if (computerScore === 5) {
            displayResult("😞 Sorry, you lost the game!");
            disableButtons();
            newGameButton.classList.add('visible');
        }
    }

    function disableButtons() {
        gameButtons.forEach((button) => {
            button.disabled = true;
        });
    }

    function enableButtons() {
        gameButtons.forEach((button) => {
            button.disabled = false;
        });
    }

    function playRound(humanChoice) {
        if (humanScore === 5 || computerScore === 5) return;

        const computerChoice = getComputerChoice();
        let resultMessage = "";

        if (
            (humanChoice === "Rock" && computerChoice === "Scissors") ||
            (humanChoice === "Paper" && computerChoice === "Rock") ||
            (humanChoice === "Scissors" && computerChoice === "Paper")
        ) {
            resultMessage = `✅ You win! ${humanChoice} beats ${computerChoice}.`;
            humanScore++;
        } else if (humanChoice === computerChoice) {
            resultMessage = `🤝 It's a tie! You both chose ${humanChoice}.`;
        } else {
            resultMessage = `❌ You lose! ${computerChoice} beats ${humanChoice}.`;
            computerScore++;
        }

        displayResult(resultMessage);
        updateScore();
        checkWinner();
    }

    gameButtons.forEach(button => {
        button.addEventListener("click", () => {
            const humanChoice = button.id.charAt(0).toUpperCase() + button.id.slice(1).toLowerCase();
            playRound(humanChoice);

            gameButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add(humanChoice.toLowerCase(), 'active');
        });
    });

    newGameButton.addEventListener("click", function () {
        humanScore = 0;
        computerScore = 0;
        updateScore();
        displayResult("Make your choice!");
        enableButtons();
        newGameButton.classList.remove('visible');
    });

    toggleThemeButton.addEventListener("click", () => {
        currentTheme = currentTheme === "light" ? "dark" : "light";
        document.body.className = themes[currentTheme];
        toggleThemeButton.innerHTML = currentTheme === "light" ? "<i class='fas fa-moon'></i>" : "<i class='fas fa-sun'></i>";
    });

    fullscreenButton.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    newGameButton.classList.remove('visible');
    updateScore();
});
