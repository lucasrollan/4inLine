var _ = require('underscore');

var playTree = require('./playTree');
var findBestMove = require('./findBestMove');
var readlineSync = require('readline-sync');
var logBoard = require('./logBoard');
var isWinningMove = require('./isWinningMove');
var i18n = require('./i18n');
var aiReport = require('./ai/report');
var msg = aiReport.keys;

i18n.setLanguage('es');

var gameState = {
    board: [
        '',  //0
        '',  //1
        '',  //2
        '',  //3
        '',  //4
        '',  //5
        ''  //6
    ],
    playing: true,
    players: ['HUMAN', 'AI'],
    currentPlayer: null
};

logBoard(gameState.board);

var playing = true;
var players = ['X', 'O'];
var currentPlayer = _.sample(players);

function printBoard() {
    var print = logBoard(gameState.board);

    print.forEach(function(line) {
        console.log(line);
    });

    console.log('   1  2  3  4  5  6  7   ');
}

function turn() {
    printBoard();

    var index = playerInput[currentPlayer]();

    gameState.board[index] += currentPlayer;

    if (isWinningMove(gameState.board, index)) {
        playing = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

var playerInput = {
    'X': function AI_turn(){
        console.log('>>>', i18n.getString(i18n.keys.TURN_AI)(), '<<<');
        aiReport.log(msg.AI_THINKING);

        var bestMove = playTree(gameState.board, 'X', 6);

        aiReport.log(msg.AI_CHOSEN_COLUMN, {column: bestMove + 1});

        return bestMove;
    },
    'O': function human_turn() {
        console.log('>>>', i18n.getString(i18n.keys.TURN_HUMAN)(), '<<<');
        var options = [1, 2, 3, 4, 5, 6, 7];

        var index = readlineSync.keyInSelect(
            options, i18n.getString(i18n.keys.SELECT_COLUMN)(),
            {
                cancel: false
            }
        );

        return index;
    }
};

while (playing) {
    turn();
}
printBoard();
console.log('>', i18n.getString(i18n.keys.GAME_OVER)());
console.log('>', i18n.getString(i18n.keys.WINNER_PLAYER)({player: currentPlayer}));