var lineLengthToWin = 4;

function getPiece(board, column, row) {
    var result = ' ';

    if (column >= 0 && column < board.length && row >=0 && row < board[column].length) {
        result = board[column][row];
    }

    return result;
}

function getTopPiece(board, column) {
    return getPiece(board, column, board[column].length - 1);
}

function projectLines(board, column) {
    var row = board[column].length - 1;
    var centerPiece = getTopPiece(board, column);

    var lines = {
        diagAsc: centerPiece,
        diagDsc: centerPiece,
        horizontal: centerPiece,
        vertical: centerPiece
    };

    for (var i=1; i<lineLengthToWin; i++) {
        lines.diagAsc += getPiece(board, column + i, row + i);
        lines.diagAsc = getPiece(board, column - i, row - i) + lines.diagAsc;
        lines.diagDsc += getPiece(board, column + i, row - i);
        lines.diagDsc = getPiece(board, column - i, row + i) + lines.diagDsc;
        lines.horizontal += getPiece(board, column + i, row);
        lines.horizontal = getPiece(board, column - i, row) + lines.horizontal;
        lines.vertical = getPiece(board, column, row - i) + lines.vertical;
    }

    return lines;
}


module.exports = function isWinningMove(board, columnAdded) {
    var result = false;

    var lookFor = getTopPiece(board, columnAdded);
    lookFor += lookFor + lookFor + lookFor;
    var lines = projectLines(board, columnAdded);

    for (var i in lines) {
        result = result || lines[i].indexOf(lookFor) >= 0;
    }

    return result;
};