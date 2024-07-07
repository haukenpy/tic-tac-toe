function player(name, symbol) {
    
    this.name = name;
    this.symbol = symbol;
    this.score = 0;
    
    this.updateScore = function() {
        this.score++;
    };

    this.hasWon = function() {
        return `Player ${this.name} has won the game!`
    };
}

function Game() {

    this.boardArray = [["--", "--", "--"], ["--", "--", "--"], ["--", "--", "--"]];

    this.displayBoard = function(i) {
            return this.boardArray[i]
    }   

    this.updateBoard = function (row, column, symbol) {
        this.boardArray[row][column] = symbol;
    }

    this.resetBoard = function () {
        this.boardArray = [["--", "--", "--"], ["--", "--", "--"], ["--", "--", "--"]];
    }
};

const gameModule = function() {

    const gameBoard = new Game();
    const playerOne = new player("P1", "X");
    const playerTwo = new player("P2", "O");

    let roundNumber = 0;
    let currentPlayer;
    let symbol = playerOne.symbol;

    // DOM Selectors
    const tiles = document.querySelectorAll(".card");
    const dialog = document.querySelector("#dialog");
    const closeBtn = document.querySelector(".close");
    const textDiv = document.querySelector(".text-div");

    // Bind Event
    tiles.forEach(tile => tile.addEventListener("click", updateCard.bind(this)));
    closeBtn.addEventListener("click", closeDialog); 

    function updateCard(e) {
        e.stopPropagation();

        determinePlayerTurn();

        if (e.target.textContent === "") {
        e.target.textContent = symbol;

        let rowColumn = e.target.id.split(" ");

        updateArray(rowColumn, symbol);
        nextRound();
        }
    };

    function updateArray(rowColumn, symbol){
        gameBoard.updateBoard(rowColumn[0], rowColumn[1], symbol);
    };

    function determinePlayerTurn() {
        if (roundNumber % 2 === 0) {
            symbol = playerOne.symbol;
            currentPlayer = playerOne;
        }

        else {
            symbol = playerTwo.symbol;
            currentPlayer = playerTwo;
        }
    };

    function nextRound(){
        if (ifWinner()) {gameFinished()}
        roundNumber++
    };

    function ifWinner() {

        // Check rows
        for (row = 0; row < 3; row++) {
            if (gameBoard.boardArray[row][0] === gameBoard.boardArray[row][1] &&
                gameBoard.boardArray[row][1] === gameBoard.boardArray[row][2] && gameBoard.boardArray[row][0] != "--") {
                return true;  
            }}

        // Check columns
        for (column = 0; column < 3; column++) {
            if (gameBoard.boardArray[0][column] === gameBoard.boardArray[1][column] &&
                gameBoard.boardArray[1][column] === gameBoard.boardArray[2][column] && gameBoard.boardArray[0][column] != "--") {
                return true;
            }}

        // Check diagonals
        if ((gameBoard.boardArray[0][0] === gameBoard.boardArray[1][1] &&
             gameBoard.boardArray[1][1] === gameBoard.boardArray[2][2] && gameBoard.boardArray[0][0] != "--") ||
            (gameBoard.boardArray[0][2] === gameBoard.boardArray[1][1] &&
             gameBoard.boardArray[1][1] === gameBoard.boardArray[2][0] && gameBoard.boardArray[0][2] != "--"))
            {return true;}
    };

    function gameFinished() {

        textDiv.textContent = currentPlayer.hasWon();

        for (i = 0; i < 3; i++) {
            let para = document.createElement("div");
            para.textContent = gameBoard.displayBoard(i);
            para.className = "board-row";
            textDiv.appendChild(para);
        }

        gameBoard.resetBoard();
        tiles.forEach(tile => tile.textContent = "");
        dialog.show();
    };

    function closeDialog() {
        dialog.close();
    };

}();  