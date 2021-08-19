const statusDisplay= document.querySelector(".game--status");

//Game status
let gameActive= true;

//Current player
let currentPlayer="X";

//track played cells
let gameState=["", "", "", "", "", "", "", "", ""];

const winningMessage= () => `Player ${currentPlayer} has won!`;
const drawMessage= () => 'Game ended in a draw';
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//initial message to let the players know whose turn it is

statusDisplay.innerHTML=currentPlayerTurn();

const handleCellPlayed = (clickedCell, clickedCellIndex) => {

    //reflect the played move
    gameState[clickedCellIndex]=currentPlayer;
    clickedCell.innerHTML= currentPlayer;
}

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === "X" ? "O" :"X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleResultValidation = () => {
    let roundWon=false;
    for (let i = 0; i <=7; i++) {
        const winningCondition = winningConditions[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];

        if (a=== '' || b=== '' || c=== '') {
            continue;
        }
        if (a === b && b===c) {
            roundWon= true;
            break;
        } 
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive= false;
        return;
    }
    //check if there are unpopulated fields

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive=false;
        return;
    }

    handlePlayerChange();
}

const handleCellClick = (clickedCellEvent) => {
    const clickedCell= clickedCellEvent.target;

    const clickedCellIndex= parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    //check if cell has been played already

    if(gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

const handleRestartGame = () => {
    gameActive= true;
    currentPlayer= "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML= currentPlayerTurn();
    document.querySelectorAll('.cell')
                .forEach(cell => cell.innerHTML = "");
}

//event listeners for cells and restart

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);