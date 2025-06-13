// Game data and state
const gameData = {
    choices: [
        {name: "rock", emoji: "🗿", beats: "scissors"},
        {name: "paper", emoji: "📄", beats: "rock"},
        {name: "scissors", emoji: "✂️", beats: "paper"}
    ],
    colors: {
        win: "#4CAF50",
        lose: "#f44336", 
        tie: "#FF9800",
        primary: "#2196F3",
        secondary: "#9C27B0"
    }
};

let gameState = {
    playerScore: 0,
    computerScore: 0,
    isPlaying: false
};

// DOM elements
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const playerChoiceEmojiEl = document.getElementById('playerChoiceEmoji');
const computerChoiceEmojiEl = document.getElementById('computerChoiceEmoji');
const resultMessageEl = document.getElementById('resultMessage');
const battleDisplayEl = document.querySelector('.battle-display');
const resetBtnEl = document.getElementById('resetBtn');
const choiceBtns = document.querySelectorAll('.choice-btn');

// Initialize the game
function initGame() {
    // Add event listeners to choice buttons
    choiceBtns.forEach(btn => {
        btn.addEventListener('click', handlePlayerChoice);
    });
    
    // Add event listener to reset button
    resetBtnEl.addEventListener('click', resetGame);
    
    // Set initial state
    updateDisplay();
}

// Handle player choice
function handlePlayerChoice(event) {
    if (gameState.isPlaying) return;
    
    const playerChoice = event.currentTarget.dataset.choice;
    const computerChoice = getRandomChoice();
    
    // Add visual feedback to selected button
    clearSelectedButtons();
    event.currentTarget.classList.add('selected');
    
    // Play the round
    playRound(playerChoice, computerChoice);
}

// Get random computer choice
function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * gameData.choices.length);
    return gameData.choices[randomIndex].name;
}

// Clear selected button styling
function clearSelectedButtons() {
    choiceBtns.forEach(btn => btn.classList.remove('selected'));
}

// Play a round of the game
function playRound(playerChoice, computerChoice) {
    gameState.isPlaying = true;
    
    // Get choice data
    const playerChoiceData = gameData.choices.find(choice => choice.name === playerChoice);
    const computerChoiceData = gameData.choices.find(choice => choice.name === computerChoice);
    
    // Update choice display
    playerChoiceEmojiEl.textContent = playerChoiceData.emoji;
    computerChoiceEmojiEl.textContent = computerChoiceData.emoji;
    
    // Show battle display with animation
    battleDisplayEl.classList.add('show');
    
    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);
    
    // Update scores
    if (result === 'win') {
        gameState.playerScore++;
        animateScoreUpdate(playerScoreEl);
    } else if (result === 'lose') {
        gameState.computerScore++;
        animateScoreUpdate(computerScoreEl);
    }
    
    // Show result with delay for dramatic effect
    setTimeout(() => {
        showResult(result, playerChoiceData.name, computerChoiceData.name);
        updateScoreDisplay();
        gameState.isPlaying = false;
        
        // Clear selection after showing result
        setTimeout(() => {
            clearSelectedButtons();
        }, 1000);
    }, 800);
}

// Determine the winner of a round
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    }
    
    const playerChoiceData = gameData.choices.find(choice => choice.name === playerChoice);
    if (playerChoiceData.beats === computerChoice) {
        return 'win';
    } else {
        return 'lose';
    }
}

// Show the result message
function showResult(result, playerChoice, computerChoice) {
    let message = '';
    let className = '';
    
    switch (result) {
        case 'win':
            message = `🎉 You Win! ${capitalizeFirst(playerChoice)} beats ${computerChoice}!`;
            className = 'win';
            addAnimationClass(resultMessageEl, 'bounce');
            break;
        case 'lose':
            message = `😔 You Lose! ${capitalizeFirst(computerChoice)} beats ${playerChoice}!`;
            className = 'lose';
            addAnimationClass(resultMessageEl, 'shake');
            break;
        case 'tie':
            message = `🤝 It's a Tie! Both chose ${playerChoice}!`;
            className = 'tie';
            addAnimationClass(resultMessageEl, 'pulse');
            break;
    }
    
    resultMessageEl.textContent = message;
    resultMessageEl.className = `result-message show ${className}`;
}

// Capitalize first letter of a string
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Add animation class temporarily
function addAnimationClass(element, animationClass) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, 800);
}

// Animate score update
function animateScoreUpdate(scoreElement) {
    scoreElement.classList.add('updated');
    setTimeout(() => {
        scoreElement.classList.remove('updated');
    }, 600);
}

// Update score display
function updateScoreDisplay() {
    playerScoreEl.textContent = gameState.playerScore;
    computerScoreEl.textContent = gameState.computerScore;
}

// Update the entire display
function updateDisplay() {
    updateScoreDisplay();
    playerChoiceEmojiEl.textContent = '❓';
    computerChoiceEmojiEl.textContent = '❓';
    resultMessageEl.textContent = 'Make your choice to start playing!';
    resultMessageEl.className = 'result-message show';
    battleDisplayEl.classList.remove('show');
    clearSelectedButtons();
}

// Reset the game
function resetGame() {
    // Add animation to reset button
    addAnimationClass(resetBtnEl, 'pulse');
    
    // Reset game state
    gameState.playerScore = 0;
    gameState.computerScore = 0;
    gameState.isPlaying = false;
    
    // Update display
    updateDisplay();
    
    // Add fade effect to the entire game container
    const gameContainer = document.querySelector('.game-container');
    gameContainer.style.opacity = '0.7';
    gameContainer.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        gameContainer.style.opacity = '1';
        gameContainer.style.transform = 'scale(1)';
    }, 200);
}

// Add keyboard support for accessibility
function handleKeyPress(event) {
    if (gameState.isPlaying) return;
    
    switch (event.key.toLowerCase()) {
        case 'r':
            const rockBtn = document.querySelector('[data-choice="rock"]');
            rockBtn.click();
            break;
        case 'p':
            const paperBtn = document.querySelector('[data-choice="paper"]');
            paperBtn.click();
            break;
        case 's':
            const scissorsBtn = document.querySelector('[data-choice="scissors"]');
            scissorsBtn.click();
            break;
        case 'escape':
            resetGame();
            break;
    }
}

// Add hover effects for better UX
function addHoverEffects() {
    choiceBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!gameState.isPlaying && !btn.classList.contains('selected')) {
                btn.style.transform = 'translateY(-4px) scale(1.02)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (!btn.classList.contains('selected')) {
                btn.style.transform = '';
            }
        });
    });
}

// Add visual feedback for button press
function addButtonPressEffects() {
    choiceBtns.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        btn.addEventListener('mouseup', () => {
            if (btn.classList.contains('selected')) {
                btn.style.transform = 'scale(1.05)';
            } else {
                btn.style.transform = '';
            }
        });
    });
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    addHoverEffects();
    addButtonPressEffects();
    
    // Add keyboard support
    document.addEventListener('keydown', handleKeyPress);
    
    // Add some initial flair
    setTimeout(() => {
        const gameTitle = document.querySelector('.game-title');
        addAnimationClass(gameTitle, 'bounce');
    }, 500);
});

// Add touch support for mobile devices
document.addEventListener('touchstart', () => {}, {passive: true});