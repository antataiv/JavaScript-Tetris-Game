var totalRows = 20;
var totalCols = 10;
var size = 32;

var canvas,
    ctx,
    blockImage,
    backgroundImage,
    gameOverImage,
    currentPiece,
    gameMatrix,
    prevTime,
    curTime,
    isGameOver,
    lineSpan,
    curLines;

window.onload = getReady();

function getReady() {
    //load the images
    blockImage = new Image();
    blockImage.src = "images/blocks.png";
    backgroundImage = new Image();
    backgroundImage.src = "images/background.png";
    gameOverImage = new Image();
    gameOverImage.src = "images/gameOver.png";

    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    lineSpan = document.getElementById('lines');

    prevTime = curTime = 0;

    document.addEventListener('keydown', getInput);

    initializeGame();
}

function initializeGame() {
    var row, col;
    curLines = 0;
    isGameOver = false;

    //create the gameMatrix as array[gameRow][gameCol] of 0's
    gameMatrix = [];
    for (row = 0; row < totalRows; row++) {
        gameMatrix[row] = [];
        for (col = 0; col < totalCols; col++) {
            gameMatrix[row][col] = 0;
        }
    }

    //generate random new Piece
    currentPiece = getRandomPiece();

    //update Line counter on canvas
    lineSpan.innerHTML = curLines.toString();

    window.requestAnimationFrame(update);
}

function update() {
    curTime = new Date().getTime();

    if(curTime - prevTime > 500) {
        //check if moving down is possible and if true --> move down
        if(isMovePossible(currentPiece, currentPiece.x, currentPiece.y + 1, currentPiece.currentState)) {
            currentPiece.y += 1;
        } else {
            //if moving down is no longer possible, then end of the canvas is reached
            //save the state of the current piece on the game matrix and generate a new piece
            saveFallenPieceState(currentPiece);
            currentPiece = getRandomPiece();
        }

        //update time
        prevTime = curTime;
    }

    drawBoard();
    drawPiece(currentPiece);
    //console.log('x=' + currentPiece.x + ' y=' + currentPiece.y);

    //check if game is not over and update the screen
    //else draw the game over image
    if(!isGameOver) {
        window.requestAnimationFrame(update);
    } else {
        ctx.drawImage(gameOverImage, 0, 0, 320, 640, 0, 0, 320, 640);
    }
}

function drawBoard() {
    //draw background
    ctx.drawImage(backgroundImage, 0, 0, 320, 640, 0, 0, 320, 640);

    //redraw the already saved previous state of the game matrix
    for (var row = 0; row < totalRows; row++) {
        for (var col = 0; col < totalCols; col++) {
            if(gameMatrix[row][col] != 0) {
                ctx.drawImage(blockImage, gameMatrix[row][col] * 32, 0, 32, 32, col * 32, row * 32, 32, 32);
            }
        }
    }
}

function drawPiece(piece) {
    var drawX = piece.x;
    var drawY = piece.y;
    var state = piece.currentState;
    var pieceRowLength = piece.states[state].length;

    //iterate through the array[][] that represents the current state of the piece
    //and draw the color index of the current piece(piece.colorIndex) on !=0 value
    for (var row = 0; row < pieceRowLength; row++) {
        var pieceColLength = piece.states[state][row].length;
        for (var col = 0; col < pieceColLength; col++) {
            if(piece.states[state][row][col] != 0 && drawY >= 0 && drawY < totalRows) {
                ctx.drawImage(blockImage, piece.colorIndex * 32, 0, 32, 32, drawX * 32, drawY * 32, 32, 32);
            }
            drawX += 1;
        }
        drawX = piece.x;
        drawY += 1;
    }
    //console.log('drawX=' + drawX + ' drawY=' + drawY);
}

function isMovePossible(piece, x, y, state) {
    var result = true;
    var newX = x;
    var newY = y;
    var pieceRowLength = piece.states[state].length;

    //iterate through the array[][] that represents the current state of the piece
    //and check if the new positions of x and y are !=0 - if true - move cannot be done
    for (var row = 0; row < pieceRowLength; row++) {
        var pieceColLength = piece.states[state][row].length;
        for (var col = 0; col < pieceColLength; col++) {
            //check if the new position of x will be outside the bounds of the canvas
            if(newX < 0 && newX > totalCols) {
                result = false;
                col = pieceColLength;
                row = pieceRowLength;
            }
            //check if the new position of y will be on row that is already defined (example: not on row 20)
            //and if the new position in the gameMatrix is not free
            else if(gameMatrix[newY] != undefined && gameMatrix[newY][newX] != 0 && piece.states[state][row][col] != 0) {
                result = false;
                col = pieceColLength;
                row = pieceRowLength;
            }
            newX += 1;
        }
        newX = x;
        newY += 1;

        if(newY > totalRows) {
            result = false;
            row = pieceRowLength;
        }
    }
    //console.log('newX=' + newX + ' newY=' + newY);
    return result;
}

function saveFallenPieceState(piece) {
    var xPos = piece.x;
    var yPos = piece.y;
    var state = piece.currentState;
    var pieceRowLength = piece.states[state].length;

    for (var row = 0; row < pieceRowLength; row++) {
        var pieceColLength = piece.states[state][row].length;
        for (var col = 0; col < pieceColLength; col++) {
            if(piece.states[state][row][col] == 1 && yPos >= 0) {
                gameMatrix[yPos][xPos] = piece.colorIndex;
            }
            xPos += 1;
        }
        xPos = piece.x;
        yPos += 1;
    }

    //write function to check for full lines and remove them
    checkIfLineIsFull();

    //check if the y coordinate of the current piece is 0
    //meaning it is on top of the canvas and the next element cannot be shown - game is over
    if(piece.y === 0){
        isGameOver = true;
    }
}

function checkIfLineIsFull() {
    var lineFound = 0;
    var lineIsFull = true;
    var row = totalRows - 1;
    var col = totalCols - 1;

    while(row >= 0){
        while(col >= 0) {
            //if we find one empty cell => line is not full
            //and break the inner while
            if(gameMatrix[row][col] == 0){
                lineIsFull = false;
                col = -1;
            }
            col--;
        }

        if(lineIsFull){
            lineFound++;
            curLines++;
            gameMatrix.pop();
            gameMatrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
        row--;
        col = totalCols - 1;
    }

    lineSpan.innerHTML = curLines.toString();
}

function getInput(event) {
    switch (event.keyCode) {
        case 37:
            //move left
            if(isMovePossible(currentPiece, currentPiece.x - 1, currentPiece.y, currentPiece.currentState)) {
                currentPiece.x--;
            }
            break;
        case 39:
            //move right
            if(isMovePossible(currentPiece, currentPiece.x + 1, currentPiece.y, currentPiece.currentState)) {
                currentPiece.x++;
            }
            break;
        case 38:
            //rotate
            var newState = currentPiece.currentState + 1;
            if(newState == currentPiece.states.length) {
                newState = 0;
            }

            if(isMovePossible(currentPiece, currentPiece.x, currentPiece.y, newState)) {
                currentPiece.currentState = newState;
            }
            break;
        case 40:
            //move down
            if(isMovePossible(currentPiece, currentPiece.x, currentPiece.y + 1, currentPiece.currentState)) {
                currentPiece.y++;
            }
            break;
    }
}