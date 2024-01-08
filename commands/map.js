/// <reference types="cypress" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a = require('./utils'), registerQuery = _a.registerQuery, findTimeout = _a.findTimeout, isArrayOfStrings = _a.isArrayOfStrings;
var repoUrl = 'https://github.com/bahmutov/cypress-map';
var repoLink = "[".concat(repoUrl, "](").concat(repoUrl, ")");
registerQuery('map', function (fnOrProperty, options) {
    if (options === void 0) { options = {}; }
    var timeout = findTimeout(this, options);
    // make sure this query command respects the timeout option
    this.set('timeout', timeout);
    if (isArrayOfStrings(fnOrProperty)) {
        // the user wants to pick the listed properties from the subject
        var message = fnOrProperty.join(', ');
        var log = options.log !== false &&
            Cypress.log({ name: 'map', message: message, timeout: timeout });
    }
    else if (Cypress._.isPlainObject(fnOrProperty)) {
        Object.keys(fnOrProperty).forEach(function (key) {
            if (typeof fnOrProperty[key] !== 'function') {
                throw new Error("Expected ".concat(key, " to be a function"));
            }
        });
        var message = Cypress._.map(fnOrProperty, function (fn, key) {
            return key + '=>' + (fn.name ? fn.name : '?');
        }).join(', ');
        var log = options.log !== false &&
            Cypress.log({ name: 'map', message: message, timeout: timeout });
    }
    else {
        var message = typeof fnOrProperty === 'string'
            ? fnOrProperty
            : fnOrProperty.name;
        var log = options.log !== false &&
            Cypress.log({ name: 'map', message: message, timeout: timeout });
    }
    return function ($el) {
        if (Cypress._.isString($el)) {
            throw new Error("cy.map is not meant to work with a string subject, did you mean cy.apply?\n".concat(repoLink));
        }
        if (Cypress._.isNumber($el)) {
            throw new Error("cy.map is not meant to work with a number subject, did you mean cy.apply?\n".concat(repoLink));
        }
        if (Cypress._.isBoolean($el)) {
            throw new Error("cy.map is not meant to work with a boolean subject, did you mean cy.apply?\n".concat(repoLink));
        }
        if (isArrayOfStrings(fnOrProperty)) {
            var result_1 = {};
            fnOrProperty.forEach(function (key) {
                if (!(key in $el)) {
                    throw new Error("Cannot find property ".concat(key));
                }
                result_1[key] = $el[key];
            });
            return result_1;
        }
        else if (Cypress._.isPlainObject(fnOrProperty)) {
            var result_2 = __assign({}, $el);
            Object.keys(fnOrProperty).forEach(function (key) {
                if (!(key in $el)) {
                    throw new Error("Cannot find property ".concat(key));
                }
                if (typeof fnOrProperty[key] !== 'function') {
                    throw new Error("Expected ".concat(key, " to be a function"));
                }
                result_2[key] = fnOrProperty[key]($el[key]);
            });
            return result_2;
        }
        else {
            // use a spread so that the result is an array
            // and used the Array constructor in the current iframe
            // so it passes the "instanceOf Array" assertion
            var list = __spreadArray([], Cypress._.map($el, function (item) {
                return typeof fnOrProperty === 'string'
                    ? Cypress._.get(item, fnOrProperty)
                    : fnOrProperty(item);
            }), true);
            return list;
        }
    };
});
