function player(name, playerSymbol) {
    
    let score = 0;
    playerSymbol: playerSymbol;
    
    function updateScore() {
        score++;
        return console.log(`player ${name} has score ${score}`);
    };

    function hasWon() {
        return console.log(`player ${name} has won the game!`);
    };

    function symbol() {
        console.log(playerSymbol);
    }

    return {
    updateScore: updateScore,
    hasWon: hasWon,
    symbol: symbol,
    } 
}

const gameBoard = function() {
    let boardArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0],]

    function displayBoard() {
        for (i = 0; i < 3; i++) {
            console.log(boardArray[i])
        }}

    function updateBoard(row, column, symbol) {
        boardArray[row][column] = symbol;
    };

    return {
        displayBoard: displayBoard,
        updateBoard: updateBoard,
    };
}();   

let playerOne = player("playerOne", "X");
let playerTwo = player("playerTwo", "O");