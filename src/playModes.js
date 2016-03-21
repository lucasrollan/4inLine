var _ = require('underscore');

var gameModes = [
    'TERMINAL',
    'BROWSER_DOM'
];

var defaultGameMode = 'TERMINAL';
var gameMode;
var ui;

var gameState = {
    board: null,
    playing: false,
    players: ['HUMAN', 'AI'],
    currentPlayer: null
};

var game = {
    'TERMINAL': {
        ui: {},
        'GAME_START': function() {
            gameState.board = ['', '', '', '', '', '', ''];
            gameState.playing = true;
            gameState.currentPlayer = _.sample(gameState.players);
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
    events: getKeys(game[defaultGameMode]),
    setMode: setMode,
    action: action
};

function action(method, data) {
    ui =  game[gameMode].ui;
    game[gameMode][method](data);
}

function setMode(mode) {
    if (_(gameModes).contains(mode)) {
        gameMode = mode;
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