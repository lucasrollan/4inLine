var _ = require('underscore');
var isWinningMove = require('./isWinningMove');
var aiReport = require('./report');
var msg = aiReport.keys;

var WINNING_MOVE = 1;
var LOSING_MOVE = -1;

var totalPlaysConsidered = 0;

function getOppositePiece(piece) {
    return piece === 'X' ? 'O' : 'X';
}

function columnHasSpace(board, column) {
    return board[column].length < 6;
}

function createBoardWithColumn(board, column, piece) {
    var newBoard;

    newBoard = board.slice();

    if (columnHasSpace(board, column)) {
        newBoard[column] += piece;
    }

    return newBoard;
}

function eachMove(board, piece, fn) {
    for (var i=0; i<board.length; i++) {
        totalPlaysConsidered++;
        fn(createBoardWithColumn(board, i, piece), i, columnHasSpace(board, i));
    }
}

function getMoves(board, piece, isOpponent) {
    var result = [];
    var opponentPiece = piece === 'X' ? 'O' : 'X';

    eachMove(board, piece, function(tempBoard, column, wasPieceAdded) {
        var moveResult = 0;
        if (wasPieceAdded) {
            if (isWinningMove(tempBoard, column)) {
                moveResult = !isOpponent ? WINNING_MOVE : LOSING_MOVE;
            } else {
                eachMove(tempBoard, opponentPiece, function(secBoard, secCol, wasPieceAdded) {
                    if (wasPieceAdded && isWinningMove(secBoard, secCol)) {
                        moveResult = !isOpponent ? LOSING_MOVE : WINNING_MOVE;
                    }
                });
            }
        }

        result.push(moveResult);
    });

    return result;
}

function rateMoves(board, piece, depth, playerPiece) {
    var nextMoves;
    var tempBoard;
    playerPiece = playerPiece || piece;
    var oppositePiece = getOppositePiece(piece);
    var isOpponent = playerPiece === oppositePiece;
    var result = getMoves(board, piece, isOpponent);

    if (depth) {
        for (var i = 0; i < board.length; i++) {
            if (result[i] === 0 && columnHasSpace(board, i)) {
                tempBoard = createBoardWithColumn(board, i, piece);
                nextMoves = rateMoves(tempBoard, oppositePiece, depth - 1, playerPiece);
                result[i] = avg(nextMoves); //should be divided?
            }
        }
    }

    return result;
}

function avg(list) {
    sum2 = function(a,b) {return a+b};

    return _.reduce(list, sum2, 0) / list.length;
}

function getBestRatedIndex(list, board) {
    var result = -1;

    for (var i=0; i<list.length && result<0; i++) {
        if (columnHasSpace(board, list[i].column)) {
            result = list[i].column;
        }
    }

    return result;
}

function handleEquallyScoredOptions(moves) {
    var score = moves[0].score;

    var parts = _.partition(moves, function(move) {
        return move.score === score;
    });

    var equallyScored = parts[0];
    var rest = parts[1];

    return _.shuffle(equallyScored).concat(rest);
}

function willWinForSure(moves) {
    function isWin(move) {
        return move.score === WINNING_MOVE;
    }

    return !_.size(_(moves).reject(isWin));
}

function willLoseForSure(moves) {
    function isLose(move) {
        return move.score === LOSING_MOVE;
    }

    return !_.size(_(moves).reject(isLose));
}

module.exports = function playTree(board, piece, depth) {
    totalPlaysConsidered = 0;
    var result;
    var results = rateMoves(board, piece, depth);

    results = results.map(function(score, column) {
        return {score: score, column: column};
    });

    results = _.sortBy(results, 'score').reverse();

    if (willWinForSure(results)) {
        result = playTree(board, piece, 0);
    } else if (willLoseForSure(results)) {
        result = playTree(board, getOppositePiece(piece), 0);
    } else {
        result = getBestRatedIndex(handleEquallyScoredOptions(results), board);
    }

    aiReport.log(msg.AI_ANALYSIS_REPORT, {total: totalPlaysConsidered});

    return result;
};
