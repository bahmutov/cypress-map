/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
registerQuery('mapInvoke', function (methodName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (args.length > 0) {
        var lastArgument = args.at(-1);
        if (lastArgument &&
            Cypress._.isFinite(lastArgument.timeout) &&
            lastArgument.timeout > 0) {
            // make sure this query command respects the timeout option
            this.set('timeout', lastArgument.timeout);
        }
    }
    var message = methodName;
    if (args.length) {
        message += ' ' + args.map(function (x) { return JSON.stringify(x); }).join(', ');
    }
    var log = Cypress.log({ name: 'mapInvoke', message: message });
    return function (list) {
        return Cypress._.map(list, function (item) { return item[methodName].apply(item, args); });
    };
});
