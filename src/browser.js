"use strict";

var game = require('./game');
var browserInterface = require('./interfaces/browser');
game.setLanguage('es');

game.setInterface(browserInterface);
game.go();