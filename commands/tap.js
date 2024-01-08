/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
registerQuery('tap', function (fn, label) {
    if (fn === void 0) { fn = console.log; }
    if (label === void 0) { label = undefined; }
    if (typeof fn === 'string') {
        // the user passed the label only, like
        // cy.tap('numbers')
        label = fn;
        fn = console.log;
    }
    var logName = label ? label : fn.name;
    var log = Cypress.log({ name: 'tap', message: logName });
    return function (subject) {
        log.set({
            $el: subject,
        });
        if (typeof label === 'string') {
            fn(label, subject);
        }
        else {
            fn(subject);
        }
        return subject;
    };
});
