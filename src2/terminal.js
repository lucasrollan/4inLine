"use strict";

var game = require('./game');
var terminalInterface = require('./interfaces/terminal');
game.setLanguage('es');

game.setInterface(terminalInterface);
game.go();
