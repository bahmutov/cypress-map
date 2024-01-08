/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
registerQuery('findOne', function (predicate) {
    var logOptions = { name: 'findOne' };
    if (typeof predicate === 'function') {
        logOptions.message = predicate.name;
    }
    var log = Cypress.log(logOptions);
    return function (subject) {
        return Cypress._.find(subject, predicate);
    };
});
