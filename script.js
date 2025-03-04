function getComputerChoice() {
    const randomNumber = Math.random();

    if (randomNumber < 0.33) return "Rock";
    if (randomNumber < 0.66) return "Paper";
    return "Scissors";
}

function getHumanChoice() {
    let userInput = prompt("Choose Rock, Paper, or Scissors:");
    
    if (userInput) { 
        userInput = userInput.trim().toLowerCase();
        
        if (["rock", "paper", "scissors"].includes(userInput)) {
            return userInput.charAt(0).toUpperCase() + userInput.slice(1);
        } else {
            alert("❌ Invalid choice! Please enter Rock, Paper, or Scissors.");
            return getHumanChoice();
        }
    } else {
        alert("❌ You must enter a choice!");
        return getHumanChoice();
    }
}

function playRound(humanChoice, computerChoice) {
    console.log(`\nYou chose: ${humanChoice}`);
    console.log(`Computer chose: ${computerChoice}`);

    if (
        (humanChoice === "Rock" && computerChoice === "Scissors") ||
        (humanChoice === "Paper" && computerChoice === "Rock") ||
        (humanChoice === "Scissors" && computerChoice === "Paper")
    ) {
        console.log(`✅ You win! ${humanChoice} beats ${computerChoice}.`);
        return "human";
    } 
    if (
        (computerChoice === "Rock" && humanChoice === "Scissors") ||
        (computerChoice === "Paper" && humanChoice === "Rock") ||
        (computerChoice === "Scissors" && humanChoice === "Paper")
    ) {
        console.log(`❌ You lose! ${computerChoice} beats ${humanChoice}.`);
        return "computer";
    } 
    console.log(`🤝 It's a tie! You both chose ${humanChoice}.`);
    return "tie";
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    // Play 5 rounds
    for (let round = 1; round <= 5; round++) {
        console.log(`\n--- Round ${round} ---`);

        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();
        const roundWinner = playRound(humanChoice, computerChoice);

        if (roundWinner === "human") humanScore++;
        if (roundWinner === "computer") computerScore++;

        console.log(`Score after Round ${round}:`);
        console.log(`Human: ${humanScore} | Computer: ${computerScore}`);
    }

    // Game result
    console.log("\n--- Final Results ---");
    if (humanScore > computerScore) {
        console.log(`🎉 Congratulations! You win the game!`);
        console.log(`Final Score: Human - ${humanScore} | Computer - ${computerScore}`);
    } else if (computerScore > humanScore) {
        console.log(`😞 Sorry, you lose the game!`);
        console.log(`Final Score: Human - ${humanScore} | Computer - ${computerScore}`);
    } else {
        console.log(`🤝 It's a tie game!`);
        console.log(`Final Score: Human - ${humanScore} | Computer - ${computerScore}`);
    }
}

playGame();
