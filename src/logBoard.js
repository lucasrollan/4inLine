module.exports = function(board, winner) {
    var result = [];

    var row;

    result.push('+-----------------------+');
    for (var r=5; r>=0; r--) {
        row = '|  ';
        for (var c=0; c<board.length; c++) {
            row += board[c].length > r ? board[c][r] : ' ';
            row += '  ';
        }
        row += '|';
        result.push(row);
    }
    if (winner) {
        result.push('+---------WINNER--------+');
    } else {
        result.push('+-----------------------+');
    }

    return result;
};