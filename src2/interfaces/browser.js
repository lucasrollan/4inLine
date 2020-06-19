var q = require('q');
var _ = require('underscore');
var aiReport = require('../ai/report');
var i18n = require('../languages');

var board;
var playerTurn;
var getHumanChoice = null;

var ui = {
    Piece: (function() {
        var Piece = function(player) {
            this.player = player;
        };
        Piece.prototype = {
            render: function() {
                this.p = document.createElement('div');
                this.p.className = [ 'piece', ' ', 'piece-', this.player].join('');
                return this.p;
            }
        };
        return Piece;
    })(),
    Column: (function() {
        var Column = function() {};
        Column.prototype = {
            render: function(index) {
                this.column = document.createElement('div');
                this.column.className = ['column', 'pcs-0'].join(' ');
                this.column.addEventListener('click', function() {
                    if (playerTurn === 'HUMAN') {
                        playerChoice = index;
                    }
                });

                this.pieceAdd = document.createElement('div');
                this.pieceAdd.className = ['piece-add', 'piece'].join(' ');

                this.pieceContainer = document.createElement('div');
                this.pieceContainer.className = 'piece-container';

                this.column.appendChild(this.pieceAdd);
                this.column.appendChild(this.pieceContainer);

                return this.column;
            },
            addPiece: function(player) {
                var piece = (new ui.Piece(player)).render();
                var first = this.pieceContainer.firstChild;
                if (first) {
                    this.pieceContainer.insertBefore(piece, first);
                } else {
                    this.pieceContainer.appendChild(piece);
                }
            }
        };
        return Column;
    })(),
    Board: (function() {
        var Board = function() {
            this.columns = [];
        };
        Board.prototype = {
            init: function() {
                for (var i=0; i<7; i++) {
                    this.columns.push(new ui.Column(i));
                }
            },
            render: function() {
                this.container = document.getElementById('board');

                this.init();
                this.container.innerHTML = '';
                this.columns.forEach(_.bind(function(column) {
                    this.container.appendChild(column.render());
                }, this));
            },
            turn: function(player) {
                this.container.className = player ? ['turn-', player].join() : '';
            },
            addPiece: function(player, column) {
                console.log('addPiece', column)
                this.columns[column].addPiece(player);
            }
        };
        return Board;
    })(),
    drawBoard: function() {
        board = new ui.Board();
        board.render();

        return board;
    },
    log: function() {
        console.log(Array.prototype.join.call(arguments, ' '));
    },
    aiReport: aiReport,
    msg: aiReport.keys
};

var gameState;

module.exports = {
    init: function(state) {
        gameState = state;
    },
    game: {
        start: gameStart,
        end: gameEnd,
        promptReset: gameReset
    },
    turn: {
        start: turnStart,
        move: addPiece,
        input: getHumanInput,
        end: turnEnd
    },
    ai: {
        thinking: aiThinking,
        chosen: aiChosen
    }
};

function gameStart() {
    ui.drawBoard();
}

function gameEnd(winner) {
    //find winning moves and draw them
    ui.log('>', i18n.getString(i18n.keys.GAME_OVER)());
    var winnerText = i18n.getString(i18n.keys['PLAYER_' + winner])();
    ui.log('>', i18n.getString(i18n.keys.WINNER_PLAYER)({player: winnerText}));
}

function gameReset() {
    //promt
    //return ui.readlineSync.keyInYNStrict(i18n.getString(i18n.keys.GAME_RESET)());
}

function turnStart(player) {
    playerTurn = player;
    //ui.drawBoard();
}

function addPiece(player, column) {
    board.addPiece(player, column);
}

function getHumanInput(boardFromOtherPlace) { //ask for available columns
    board.turn('HUMAN');
    var promise = q.defer();

    getHumanChoice = function(column) {
        promise.resolve(column);
    };

    return promise;
}

function turnEnd(player, column) {
    board.turn(null);
}

function aiThinking() {
    ui.log('>>>', i18n.getString(i18n.keys.TURN_AI)(), '<<<');
    ui.aiReport.log(ui.msg.AI_THINKING);
}

function aiChosen(column) {
    //board.addPiece('AI', column);
    //ui.aiReport.log(ui.msg.AI_CHOSEN_COLUMN, {column: column + 1});
}
