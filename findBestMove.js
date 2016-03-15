//win? rate:1 -- lose? rate:-1
var _ = require('underscore');

function getSum(rates) {
    var sum = 0;

    for (var i=0; i<rates.length; i++) {
        sum += rates[i];
    }

    return formatDec(sum);
}

function formatDec(num) { //to 3 decimals
    num = num * 1000;
    num = Math.round(num);
    return num / 1000;
}

function rateMoves(tree, piece, level) {
    var rates = [];
    var rate;
    var level = level || 1;

    for (var i=0; i<tree.length; i++) {
        if (typeof tree[i] === 'string') {
            if (tree[i] === '_') {
                rate = 0;
            } else {
                rate = tree[i] === piece ? 100 : -100;
            }
        } else {
            var nextLevelRates = rateMoves(tree[i], piece, level + 1);
            rate = getSum(nextLevelRates);
        }

        rates.push(rate / level);
    }

    return rates;
}

function chooseBestAvailable(rates, board) {
    var result = -1;

    for (var i=0; i<rates.length && result<0; i++) {
        var column = rates[i].column;
        if (board[column].length < 6) {
            console.log('> Column', column, 'for i:', i);
            result = column;
        } else {
            console.log('> Column', column, 'is full');
        }
    }

    return result;
}

module.exports = function findBestMove(tree, piece, board) {
    var rates = rateMoves(tree, piece);
    
    var rateMap = rates.map(function(rate, column) {
        return {rate: rate, column: column};
    });
    rateMap = _.sortBy(rateMap, 'rate').reverse();
    console.log(JSON.stringify(rateMap));

    return chooseBestAvailable(rateMap, board);
};