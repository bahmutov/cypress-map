/// <reference types="cypress" />
var registerCommand = require('./utils').registerCommand;
registerCommand('mapChain', { prevSubject: 'Array' }, function (list, fn) {
    if (!Array.isArray(list)) {
        throw new Error('Expected cy.mapChain subject to be an array');
    }
    if (!list.length) {
        // if there are items in the list
        // can quickly move on
        return [];
    }
    var results = [];
    var produceValue = function (k) {
        return cy
            .wrap(null, { log: false })
            .then(function () { return fn(list[k], k); })
            .then(function (result) {
            results.push(result);
            if (k >= list.length - 1) {
                // done
            }
            else {
                return produceValue(k + 1);
            }
        });
    };
    // make sure we put the possible promises into the command chain
    return cy
        .wrap(results, { log: false })
        .then(function () { return produceValue(0); }, { log: false })
        .then(function () { return results; });
});
