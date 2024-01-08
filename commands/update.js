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
var registerQuery = require('./utils').registerQuery;
registerQuery('update', function (prop, callback) {
    if (typeof callback !== 'function') {
        throw new Error('Expected a function to apply');
    }
    var log = Cypress.log({
        name: 'update',
        message: "".concat(prop, " by ").concat(callback.name),
    });
    return function (subject) {
        var _a;
        log.set({
            $el: subject,
        });
        return __assign(__assign({}, subject), (_a = {}, _a[prop] = callback(subject[prop]), _a));
    };
});
