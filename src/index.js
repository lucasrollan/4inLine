var playTree = require('./playTree');
var findBestMove = require('./findBestMove');
var readlineSync = require('readline-sync');
var logBoard = require('./logBoard');
var isWinningMove = require('./isWinningMove');

var board = [
    '',  //0
    '',  //1
    '',  //2
    'X',  //3
    '',  //4
    '',  //5
    ''  //6
];

logBoard(board);

var playing = true;
var currentPlayer = 'O';

function printBoard() {
    var print = logBoard(board);

    print.forEach(function(line) {
        console.log(line);
    });

    console.log('   1  2  3  4  5  6  7   ');
}

function turn() {
    printBoard();

    var index = playerInput[currentPlayer]();

    board[index] += currentPlayer;

    if (isWinningMove(board, index)) {
        playing = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

var playerInput = {
    'X': function AI_turn(){
        var bestMove = playTree(board, 'X', 6);

        console.log('> I think my best move is at column', bestMove + 1);

        return bestMove;
    },
    'O': function human_turn() {
        var options = [1, 2, 3, 4, 5, 6, 7];

        var index = readlineSync.keyInSelect(options, 'Which column?');

        return index;
    }
};

while (playing) {
    turn();
}
printBoard();
console.log('> GAME OVER');
console.log('> WINNER:', currentPlayer);