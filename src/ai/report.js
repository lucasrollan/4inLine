var _ = require('underscore');
var i18n = require('../i18n');

var strategies = {
    'terminal': {
        log: function(key, data) {
            console.log('>', i18n.getString(key)(data));
        },
        warn: function(key, data) {
            console.warn(i18n.getString(key)(data));
        },
        error: function(key, data) {
            console.error(i18n.getString(key)(data));
        },
        important: function(key, data) {
            console.log('!!! >', i18n.getString(key)(data));
        }
    }
};

var logTypes = [
    'log',
    'warn',
    'error',
    'important'
];
var defaultLogType = 'log';

var defaultStrategy = 'terminal';
var strategy = defaultStrategy;

module.exports = {
    setMode: setStrategy,
    log: log,
    mode: getStrategies(),
    keys: _(i18n.keys).pick(function(key) {
        return key.indexOf('AI_') === 0;
    })
};

function log(key, data, type) {
    if (!_(logTypes).contains(type)) {
        type = defaultLogType;
    }

    strategies[strategy][type](key, data);
}

function setStrategy(newStrategy) {
    if (_(strategies).contains(newStrategy)) {
        strategy = newStrategy;
    } else {
        throw ['Mode', newStrategy, 'is not defined'].join(' ');
    }
}

function getStrategies() {
    var result = {};

    _(_.keys(strategies)).each(function(key) {
        result[key] = key;
    });

    return result;
}