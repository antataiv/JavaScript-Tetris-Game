var LPiece = (function() {
    this.state1 = [ [1, 0],
                    [1, 0],
                    [1, 1]];

    this.state2 = [ [0, 0, 1],
                    [1, 1, 1]];

    this.state3 = [ [1, 1],
                    [0, 1],
                    [0, 1]];

    this.state4 = [ [1, 1, 1],
                    [1, 0, 0]];

    this.states = [this.state1, this.state2, this.state3, this.state4];
    this.currentState = 0;
    this.colorIndex = 1;
    //top left coordinates of piece
    this.x = 4;
    this.y = 0;
});

var ReverseLPiece = (function() {
    this.state1 = [ [0, 1],
                    [0, 1],
                    [1, 1]];

    this.state2 = [ [1, 0, 0],
                    [1, 1, 1]];

    this.state3 = [ [1, 1],
                    [1, 0],
                    [1, 0]];

    this.state4 = [ [1, 1, 1],
                    [0, 0, 1]];

    this.states = [this.state1, this.state2, this.state3, this.state4];
    this.currentState = 0;
    this.colorIndex = 2;
    //top left coordinates of piece
    this.x = 3;
    this.y = 0;
});

var BlockPiece = (function() {
    this.state1 = [ [1, 1],
                    [1, 1]];

    this.states = [this.state1];
    this.currentState = 0;
    this.colorIndex = 3;
    //top left coordinates of piece
    this.x = 4;
    this.y = 0;
});

var LinePiece = (function() {
    this.state1 = [ [1],
                    [1],
                    [1],
                    [1]];

    this.state2 = [ [1, 1, 1, 1] ];

    this.states = [this.state1, this.state2];
    this.currentState = 0;
    this.colorIndex = 4;
    //top left coordinates of piece
    this.x = 4;
    this.y = 0;
});

var TPiece = (function() {
    this.state1 = [ [1, 1, 1],
                    [0, 1, 0]];

    this.state2 = [ [0, 1],
                    [1, 1],
                    [0, 1]];

    this.state3 = [ [0, 1, 0],
                    [1, 1, 1]];

    this.state4 = [ [1, 0],
                    [1, 1],
                    [1, 0]];

    this.states = [this.state1, this.state2, this.state3, this.state4];
    this.currentState = 0;
    this.colorIndex = 5;
    //top left coordinates of piece
    this.x = 3;
    this.y = 0;
});

var ZPiece = (function() {
    this.state1 = [ [1, 1, 0],
                    [0, 1, 1]];

    this.state2 = [ [0, 1],
                    [1, 1],
                    [1, 0]];

    this.states = [this.state1, this.state2];
    this.currentState = 0;
    this.colorIndex = 6;
    //top left coordinates of piece
    this.x = 3;
    this.y = 0;
});

var ReverseZPiece = (function() {
    this.state1 = [ [0, 1, 1],
                    [1, 1, 0]];

    this.state2 = [ [1, 0],
                    [1, 1],
                    [0, 1]];

    this.states = [this.state1, this.state2];
    this.currentState = 0;
    this.colorIndex = 7;
    //top left coordinates of piece
    this.x = 3;
    this.y = 0;
});

var PlusPiece = (function() {
    this.state1 = [ [0, 1, 0],
                    [1, 1, 1],
					[0, 1, 0]];

    this.states = [this.state1];
    this.currentState = 0;
    this.colorIndex = 1;
    //top left coordinates of piece
    this.x = 3;
    this.y = 0;
});

var SinglePiece = (function() {
    this.state1 = [ [ 1] ];

    this.states = [this.state1];
    this.currentState = 0;
    this.colorIndex = 2;
    //top left coordinates of piece
    this.x = 3;
    this.y = 0;
});

function getRandomPiece() {
    var result = Math.floor(Math.random() * 9);
    var piece;

    switch (result) {
        case 0: piece = new LPiece();
            break;
        case 1: piece = new BlockPiece();
            break;
        case 2: piece = new ZPiece();
            break;
        case 3: piece = new TPiece();
            break;
        case 4: piece = new ReverseLPiece();
            break;
        case 5: piece = new ReverseZPiece();
            break;
        case 6: piece = new LinePiece();
            break;
		case 7: piece = new PlusPiece();
			break;
		case 8: piece = new SinglePiece();
			break;
    }
    //piece.color = Math.floor(Math.random() * 8);

    return piece;
}