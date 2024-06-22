// Game constants
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Game variables
let currentPlayer = PLAYER_X;
let cells = document.querySelectorAll('.cell');
let messageElement = document.getElementById('message');
let restartButton = document.getElementById('restart-btn');
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Handle cell click event
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.id.split('-')[1]);

    // Check if cell is already filled or game is not active
    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    // Update game state
    gameBoard[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.color = currentPlayer === PLAYER_X ? 'red' : 'green';

    // Check for win or draw
    if (checkWin()) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        // Switch turns
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        messageElement.textContent = `${currentPlayer}'s turn`;
    }
}

// Check if there's a winner
function checkWin() {
    return WINNING_COMBOS.some(combo => {
        return gameBoard[combo[0]] !== '' &&
               gameBoard[combo[0]] === gameBoard[combo[1]] &&
               gameBoard[combo[1]] === gameBoard[combo[2]];
    });
}

// Check if the board is full (draw)
function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

// End game and display result
function endGame(draw) {
    gameActive = false;
    if (draw) {
        messageElement.textContent = "It's a draw!";
    } else {
        messageElement.textContent = `${currentPlayer} wins!`;
    }
}

// Restart game
function restartGame() {
    gameActive = true;
    currentPlayer = PLAYER_X;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    messageElement.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#fff';
    });
}
