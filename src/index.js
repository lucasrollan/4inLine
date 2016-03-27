var interface = require('./playModes');

var gameEnd = false;

interface.setMode(interface.modes.TERMINAL);
interface.action(interface.actions.GAME_START);

while (!gameEnd) {
    interface.action(interface.actions.TURN_START);

    var index = interface.action(interface.actions.TURN_INPUT);
    interface.action(interface.actions.TURN_MOVEMENT_CHOSEN, index);

    gameEnd = interface.action(interface.actions.TURN_END, index);
}
interface.action(interface.actions.GAME_END);