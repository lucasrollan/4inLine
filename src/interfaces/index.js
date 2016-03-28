var i18n = require('../languages');
var terminal = require('./terminal');

var interfaces = {
    'TERMINAL': terminal
};

var defaultInterface = 'TERMINAL';
var activeInterface;

var api = {
    setInterface: setInterface,
    setLanguage: i18n.setLanguage,
    init: null,
    game: null,
    turn: null
};

module.exports = api;

setInterface(defaultInterface);

function setInterface(value) {
    activeInterface = interfaces[value];

    api.init = activeInterface.init;
    api.game = activeInterface.game;
    api.turn = activeInterface.turn;
    api.ai = activeInterface.ai;
}