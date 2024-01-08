/// <reference types="cypress" />
var registerQuery = require('./utils').registerQuery;
/**
 * Queries the table
 * @param {number?} x Top left corner X index (zero based)
 * @param {number?} y Top left corner Y index (zero based)
 * @param {number?} w Number of columns
 * @param {number?} h Number of rows
 */
function cyTable(x, y, w, h) {
    var message;
    if (typeof x === 'number' && typeof y === 'number') {
        message = "x:".concat(x, ",y:").concat(y);
    }
    if (typeof w === 'number') {
        message += ",w:".concat(w);
    }
    if (typeof h === 'number') {
        message += ",h:".concat(h);
    }
    var log = Cypress.log({ name: 'table', message: message });
    var wSet = typeof w === 'number';
    var hSet = typeof h === 'number';
    return function ($table) {
        var cells = Cypress._.map($table.find('tr'), function (tr) {
            return Cypress._.map(tr.children, 'innerText');
        });
        if (typeof x === 'number' && typeof y === 'number') {
            if (!wSet && cells.length) {
                w = cells[0].length;
            }
            if (!hSet) {
                h = cells.length;
            }
            var slice = cells.slice(y, y + h).map(function (row) {
                return row.slice(x, x + w);
            });
            return slice;
        }
        return cells;
    };
}
registerQuery('table', cyTable);
