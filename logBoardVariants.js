module.exports = function(logs) {
    var string;
    for (var line=0; line<logs[0].length; line++) {
        string = '';
        for (var i=0; i<logs.length; i++) {
            string += logs[i][line];
            string += '  ';
        }
        console.log(string);
    }
};