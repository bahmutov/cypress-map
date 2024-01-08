/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
registerQuery('sample', function (n) {
    if (n === void 0) { n = 1; }
    if (n < 1) {
        throw new Error("Sample size should be positive, was ".concat(n));
    }
    if (n === 1) {
        var log = Cypress.log({ name: 'sample' });
        return function (subject) {
            if (Cypress.dom.isJquery(subject)) {
                var randomElement = Cypress._.sample(subject.toArray());
                // wrap into jQuery object so other commands
                // can be attached, like cy.click
                return Cypress.$(randomElement);
            }
            return Cypress._.sample(subject);
        };
    }
    else {
        var log = Cypress.log({ name: 'sample', message: String(n) });
        return function (subject) {
            if (Cypress.dom.isJquery(subject)) {
                var randomElement = Cypress._.sampleSize(subject.toArray(), n);
                // wrap into jQuery object so other commands
                // can be attached, like cy.click
                return Cypress.$(randomElement);
            }
            return Cypress._.sampleSize(subject, n);
        };
    }
});
