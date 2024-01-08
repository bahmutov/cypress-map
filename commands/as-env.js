/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
registerQuery('asEnv', function (name) {
    if (typeof name !== 'string') {
        throw new Error("Invalid cy.asEnv name ".concat(index));
    }
    if (!name) {
        throw new Error("Empty cy.asEnv name");
    }
    var log = Cypress.log({ name: 'asEnv', message: name });
    return function (subject) {
        if (Cypress._.isNil(subject)) {
            throw new Error('No subject to save cy.asEnv');
        }
        Cypress.env(name, subject);
        return subject;
    };
});
