/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
registerQuery('primo', function () {
    var log = Cypress.log({ name: 'primo' });
    return function (subject) {
        if (Cypress.dom.isJquery(subject)) {
            return subject[0];
        }
        if (Array.isArray(subject)) {
            return subject[0];
        }
        throw new Error('Not sure how to pick the first item');
    };
});
