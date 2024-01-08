/// <reference types="cypress" />
/**
 * @see https://on.cypress.io/custom-commands
 */
function registerQuery(name, fn) {
    // prevent double registration attempt
    if (!(name in cy)) {
        return Cypress.Commands.addQuery(name, fn);
    }
}
function registerCommand(name, options, fn) {
    // prevent double registration attempt
    if (!(name in cy)) {
        if (typeof options === 'function') {
            return Cypress.Commands.add(name, fn);
        }
        else {
            return Cypress.Commands.add(name, options, fn);
        }
    }
}
/**
 * Finds the timeout option from this command or from its parent command
 */
function findTimeout(cmd, options) {
    var _a, _b, _c;
    if (options === void 0) { options = {}; }
    if (Cypress._.isFinite(options.timeout)) {
        return options.timeout;
    }
    var defaultTimeout = Cypress.config('defaultCommandTimeout');
    if (!cmd) {
        return defaultTimeout;
    }
    var prev = (_a = cmd.attributes) === null || _a === void 0 ? void 0 : _a.prev;
    var prevTimeout = (_b = prev === null || prev === void 0 ? void 0 : prev.attributes) === null || _b === void 0 ? void 0 : _b.timeout;
    if (Cypress._.isFinite(prevTimeout)) {
        return prevTimeout;
    }
    if ((_c = prev.attributes.args) === null || _c === void 0 ? void 0 : _c.length) {
        var lastArg = prev.attributes.args.at(-1);
        if (Cypress._.isFinite(lastArg === null || lastArg === void 0 ? void 0 : lastArg.timeout)) {
            return lastArg === null || lastArg === void 0 ? void 0 : lastArg.timeout;
        }
    }
    return defaultTimeout;
}
/**
 * Returns true if the argument is an array of strings.
 * Note: an empty array is not considered an array of strings.
 */
function isArrayOfStrings(x) {
    return (Cypress._.isArray(x) &&
        x.length &&
        x.every(function (item) { return typeof item === 'string'; }));
}
module.exports = {
    registerQuery: registerQuery,
    registerCommand: registerCommand,
    findTimeout: findTimeout,
    isArrayOfStrings: isArrayOfStrings,
};
