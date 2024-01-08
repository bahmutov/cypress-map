/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
registerQuery('prop', function (propertyName) {
    var log = Cypress.log({ name: 'prop', message: propertyName });
    return function (subject) {
        if (Cypress.dom.isJquery(subject)) {
            return subject.prop(propertyName);
        }
        return subject[propertyName];
    };
});
