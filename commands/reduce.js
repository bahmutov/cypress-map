/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
registerQuery('reduce', function (fn, initialValue) {
    if (typeof fn !== 'function') {
        throw new Error('Expected a function to apply');
    }
    var message = fn.name;
    if (typeof initialValue !== 'undefined') {
        message += ', ' + initialValue;
    }
    var log = Cypress.log({ name: 'reduce', message: message });
    // see https://lodash.com/docs/ _.reduce documentation
    if (typeof initialValue !== 'undefined') {
        return function (list) { return Cypress._.reduce(list, fn, initialValue); };
    }
    else {
        return function (list) { return Cypress._.reduce(list, fn); };
    }
});
// hmm, should we have ".max" and ".min" helper query commands?
