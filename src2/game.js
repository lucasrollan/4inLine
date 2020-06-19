var _ = require('underscore');
var gameAI = require('./ai');
var i18n = require('./languages');

var interfaces;
var gameRunning = true;
var players = {
    'AI': 'AI',
    'HUMAN': 'HUMAN'
};
var pieces = {
    'AI': 'X',
    'HUMAN': 'O'
};

var gameState = {
    board: null,
    playing: false,
    currentPlayer: null
};

module.exports = {
    setInterface: setInterface,
    setLanguage: i18n.setLanguage,
    go: go
};

function setInterface(value) {
    interfaces = value;
}

function go() {
    while (gameRunning) {
        interfaces.init(gameState);
        game.start();
        gameRunning = interfaces.game.promptReset();
    }
}

var game = {
        start: function() {
            var column;

            interfaces.game.start();
            gameState.board = ['', '', '', '', '', '', ''];
            gameState.playing = true;
            gameState.currentPlayer = _.sample(players);

            while (gameState.playing) {
                turn.start();
                column = turn.input();
                turn.addPiece(column);
                turn.end(column);
            }

            game.end(gameState.currentPlayer);
        },
        end: function(winner) {
            interfaces.game.end(winner);
        }
};
var turn = {
    start: function() {
        interfaces.turn.start(gameState.currentPlayer);
    },
    input: function() {
        var column;

        if (gameState.currentPlayer === players.HUMAN) {
            column = interfaces.turn.input(gameState.board);
        } else {
            column = getAiInput();
        }

        return column;
    },
    addPiece: function(column) {
        gameState.board[column] += pieces[gameState.currentPlayer];
        interfaces.turn.move(gameState.currentPlayer, column);
    },
    end: function(column) {
        interfaces.turn.end(gameState.currentPlayer);

        if (gameAI.isWinningMove(gameState.board, column)) {
            gameState.playing = false;
        } else {
            gameState.currentPlayer = _(players).without(gameState.currentPlayer)[0];
        }
    }
};

function getAiInput() {
    var column;

    interfaces.ai.thinking();
    column = gameAI.playTree(gameState.board, pieces.AI, 6);
    interfaces.ai.chosen(column);

    return column;
}