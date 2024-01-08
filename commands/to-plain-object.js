var registerQuery = require('./utils').registerQuery;
registerQuery('toPlainObject', function () {
    var log = Cypress.log({ name: 'toPlainObject' });
    return function (subject) {
        return JSON.parse(JSON.stringify(subject));
    };
});
