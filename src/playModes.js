var _ = require('underscore');
var isWinningMove = require('./isWinningMove');
var playTree = require('./playTree');
var aiReport = require('./ai/report');
var logBoard = require('./logBoard');
var readlineSync = require('readline-sync');
var i18n = require('./i18n');

i18n.setLanguage('es');

var gameModes = [
    'TERMINAL',
    'BROWSER_DOM'
];

var defaultGameMode = 'TERMINAL';
var gameMode;
var ui;

var gameAI = {
    isWinningMove: isWinningMove,
    playTree: playTree
};

var gameState = {
    board: null,
    playing: false,
    players: ['X', 'O'],
    currentPlayer: null
};

var game = {
    'TERMINAL': {
        ui: {
            drawBoard: function() {
                var print = logBoard(gameState.board);

                print.forEach(function(line) {
                    console.log(line);
                });

                console.log('   1  2  3  4  5  6  7   ');
            },
            log: function() {
                console.log(Array.prototype.join.call(arguments, ' '));
            },
            aiReport: aiReport,
            msg: aiReport.keys,
            readlineSync: readlineSync
        },
        'GAME_START': function() {
            gameState.board = ['', '', '', '', '', '', ''];
            gameState.playing = true;
            gameState.currentPlayer = _.sample(gameState.players);
        },
        'GAME_END': function() {
            ui.drawBoard();
            ui.log('>', i18n.getString(i18n.keys.GAME_OVER)());
            ui.log('>', i18n.getString(i18n.keys.WINNER_PLAYER)({player: gameState.currentPlayer}));
        },
        'TURN_START': function() {
            ui.drawBoard();
        },
        'TURN_INPUT': function() {
            if (gameState.currentPlayer === 'O') {
                return action('TURN_HUMAN_INPUT');
            } else {
                return action('TURN_AI_INPUT');
            }
        },
        'TURN_HUMAN_INPUT': function() {
            ui.log('>>>', i18n.getString(i18n.keys.TURN_HUMAN)(), '<<<');
            var options = [1, 2, 3, 4, 5, 6, 7];

            var index = ui.readlineSync.keyInSelect(
                options, i18n.getString(i18n.keys.SELECT_COLUMN)(),
                { cancel: false }
            );

            return index;
        },
        'TURN_AI_INPUT': function() {
            ui.log('>>>', i18n.getString(i18n.keys.TURN_AI)(), '<<<');
            ui.aiReport.log(ui.msg.AI_THINKING);

            var bestMove = gameAI.playTree(gameState.board, 'X', 6);

            ui.aiReport.log(ui.msg.AI_CHOSEN_COLUMN, {column: bestMove + 1});

            return bestMove;
        },
        'TURN_MOVEMENT_CHOSEN': function(column) {
            gameState.board[column] += gameState.currentPlayer;
        },
        'TURN_END': function(index) {
            if (gameAI.isWinningMove(gameState.board, index)) {
                gameState.playing = false;
                return true;
            } else {
                gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
                return false;
            }
        }
    },
    'BROWSER_DOM': {
        ui: {},
        'GAME_START': function() {

        },
        'GAME_END': function() {

        },
        'TURN_START': function() {

        },
        'TURN_HUMAN_INPUT': function() {

        },
        'TURN_AI_INPUT': function() {

        },
        'TURN_END': function() {

        }
    }
};

setMode(defaultGameMode);

module.exports = {
    modes: getKeys(game),
    actions: getKeys(game[defaultGameMode]),
    setMode: setMode,
    action: action
};

function action(method, data) {
    return game[gameMode][method](data);
}

function setMode(mode) {
    if (_(gameModes).contains(mode)) {
        gameMode = mode;
        ui = game[gameMode].ui;
    } else {
        throw [gameMode, 'game mode not defined'].join(' ');
    }
}

function getKeys(element) {
    var result = {};

    _(element).each(function(value, key) {
        result[key] = key;
    });

    return result;
}