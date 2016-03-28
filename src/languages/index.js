var _ = require('underscore');

var defaultLanguage = 'en';
var language = defaultLanguage;

var i18n = {
    'en' : {
        'AI_CHOSEN_COLUMN': 'I think my best move is at column <%= column %>',
        'AI_ANALYSIS_REPORT': 'Done thinking, analyzed <%= total %> different movements',
        'AI_THINKING': 'Thinking...',
        'SELECT_COLUMN': 'Which column?',
        'GAME_OVER': 'GAME OVER',
        'WINNER_PLAYER': 'WINNER: <%= player %>',
        'GAME_RESET': 'Do you want to play again?',
        'TURN_HUMAN': 'Your turn',
        'TURN_AI': 'AI turn',
        'PLAYER_AI': 'AI',
        'PLAYER_HUMAN': 'Human'
    },
    'es' : {
        'AI_CHOSEN_COLUMN': 'Se elegió la columna <%= column %>',
        'AI_ANALYSIS_REPORT': 'Análisis terminado, se consideraron <%= total %> posibilidades diferentes',
        'AI_THINKING': 'Analizando...',
        'SELECT_COLUMN': 'Selecciona una columna',
        'GAME_OVER': 'JUEGO TERMINADO',
        'WINNER_PLAYER': 'GANADOR: <%= player %>',
        'GAME_RESET': 'Quieres jugar de nuevo?',
        'TURN_HUMAN': 'Tu turno',
        'TURN_AI': 'Turno de la IA',
        'PLAYER_AI': 'IA',
        'PLAYER_HUMAN': 'Humano'
    }
};

var compiled = [];
compileLanguage(defaultLanguage);

module.exports = {
    setLanguage: setLanguage,
    getString: getString,
    keys: getKeys(defaultLanguage)
};

function setLanguage(lang) {
    var lang = lang.toLowerCase();

    if (_(i18n).has(lang)) {
        compileLanguage(lang);
        language = lang;
    } else {
        throw ['Language', lang, 'is not available'].join(' ');
    }
}

function getString(key) {
    var lang = i18n[language][key] ? language : defaultLanguage;

    var result = i18n[lang][key];

    if (!result) {
        throw [key, 'is not available'].join(' ');
    }

    return result;
}

function getKeys(lang) {
    var result = {};
    var keys = _.keys(i18n[lang]);

    _(keys).each(function(key) {
        result[key] = key;
    });

    return result;
}

function compileLanguage(lang) {
    if (!_(compiled).contains(lang)) {
        i18n[lang] = _(i18n[lang]).mapObject(_.template);
    }
}