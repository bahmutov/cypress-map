/// <reference types="cypress" />
var registerCommand = require('./utils').registerCommand;
registerCommand('invokeOnce', { prevSubject: true }, function (subject, methodName) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var message = methodName;
    if (args.length) {
        message += ' ' + args.map(JSON.stringify).join(',');
    }
    var log = Cypress.log({ name: 'invokeOnce', message: message });
    if (typeof subject[methodName] !== 'function') {
        throw new Error("Cannot find method ".concat(methodName, " on the current subject"));
    }
    return subject[methodName].apply(subject, args);
});
