// to avoid relying on old polyfills for node "format"
// use a custom formatter plus our own code
var format = require('string-format');
function formatTitle(pattern, x) {
    if (pattern.includes('{}') || pattern.includes('{0}')) {
        x = JSON.stringify(x);
    }
    if (pattern.includes('%d')) {
        return pattern.replace('%d', x);
    }
    if (pattern.includes('%o')) {
        return pattern.replace('%o', JSON.stringify(x));
    }
    return format(pattern, x);
}
var registerQuery = require('./utils').registerQuery;
registerQuery('print', function (formatPattern) {
    var log = Cypress.log({ name: 'print', message: '' });
    if (typeof formatPattern === 'string') {
        return function (subject) {
            var formatted = formatTitle(formatPattern, subject);
            log.set('message', formatted);
            return subject;
        };
    }
    else if (typeof formatPattern === 'function') {
        return function (subject) {
            var formatted = formatPattern(subject);
            if (typeof formatted !== 'string') {
                formatted = JSON.stringify(formatted);
            }
            log.set('message', formatted);
            return subject;
        };
    }
    else {
        return function (subject) {
            log.set('message', JSON.stringify(subject));
            return subject;
        };
    }
});
