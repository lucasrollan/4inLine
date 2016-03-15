var isWinningMove = require('./isWinningMove');

module.exports = function playTree(board, piece, depth) {
    var result = [];

    var newBoard;
    var isEnding;

    var playResult;

    for (var i=0; i<board.length; i++) {
        if (board[i].length<6) {
            newBoard = board.slice();

            newBoard[i] += piece;

            isEnding = isWinningMove(newBoard, i);
            if (isEnding) {
                playResult = piece;
            } else if (depth) {
                var nextPiece = piece == 'X' ? 'O' : 'X';
                playResult = playTree(newBoard, nextPiece, depth - 1);
            } else {
                playResult = '_';
            }
        } else {
            playResult = '/';
        }

        result.push(playResult);
    }

    return result;
};