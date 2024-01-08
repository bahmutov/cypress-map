/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
registerQuery('apply', function (callback) {
    if (typeof callback !== 'function') {
        throw new Error('Expected a function to apply');
    }
    var log = Cypress.log({ name: 'apply', message: callback.name });
    return function (subject) {
        log.set({
            $el: subject,
        });
        return callback(subject);
    };
});
