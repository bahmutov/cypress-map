/// <reference types="cypress" />
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var registerQuery = require('./utils').registerQuery;
registerQuery('partial', function (callback) {
    var knownArguments = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        knownArguments[_i - 1] = arguments[_i];
    }
    if (typeof callback !== 'function') {
        throw new Error('Expected a function to partially apply');
    }
    var applied = callback.bind.apply(callback, __spreadArray([null], knownArguments, false));
    var log = Cypress.log({
        name: 'partial',
        message: "".concat(callback.name, " with ").concat(knownArguments.join(',')),
    });
    return function (subject) {
        log.set({
            $el: subject,
        });
        return applied(subject);
    };
});
