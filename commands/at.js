/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
registerQuery('at', function (index) {
    if (typeof index !== 'number') {
        throw new Error("Invalid cy.at index ".concat(index));
    }
    var log = Cypress.log({ name: 'at', message: String(index) });
    return function (subject) {
        if (Cypress.dom.isJquery(subject) || Array.isArray(subject)) {
            if (index < 0) {
                return subject[subject.length + index];
            }
            return subject[index];
        }
        throw new Error("Not sure how to pick the item at ".concat(index));
    };
});
