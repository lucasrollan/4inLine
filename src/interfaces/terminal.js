var _ = require('underscore');
var aiReport = require('../ai/report');
var logBoard = require('../logBoard');
var readlineSync = require('readline-sync');
var i18n = require('../i18n');

var ui = {
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
};

var gameState;

module.exports = {
    init: function(state) {
        gameState = state;
    },
    game: {
        start: _.noop,
        end: gameEnd,
        promptReset: gameReset
    },
    turn: {
        start: turnStart,
        input: getHumanInput,
        end: _.noop
    },
    ai: {
        thinking: aiThinking,
        chosen: aiChosen
    }
};

function gameEnd(winner) {
    ui.drawBoard();
    ui.log('>', i18n.getString(i18n.keys.GAME_OVER)());
    var winnerText = i18n.getString(i18n.keys['PLAYER_' + winner])();
    ui.log('>', i18n.getString(i18n.keys.WINNER_PLAYER)({player: winnerText}));
}

function gameReset() {
    return ui.readlineSync.keyInYNStrict(i18n.getString(i18n.keys.GAME_RESET)());
}

function turnStart() {
    ui.drawBoard();
}

function getHumanInput(board) {
    ui.log('>>>', i18n.getString(i18n.keys.TURN_HUMAN)(), '<<<');
    var options = [1, 2, 3, 4, 5, 6, 7]; //TODO: REMOVE / DISABLE FILLED UP COLUMNS

    var index = ui.readlineSync.keyInSelect(
        options, i18n.getString(i18n.keys.SELECT_COLUMN)(),
        { cancel: false }
    );

    return index;
}

function aiThinking() {
    ui.log('>>>', i18n.getString(i18n.keys.TURN_AI)(), '<<<');
    ui.aiReport.log(ui.msg.AI_THINKING);
}

function aiChosen(column) {
    ui.aiReport.log(ui.msg.AI_CHOSEN_COLUMN, {column: column + 1});
}