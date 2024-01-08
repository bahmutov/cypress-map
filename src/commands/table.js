/// <reference types="cypress" />

const { registerQuery } = require('./utils')

/**
 * Queries the table
 * @param {number?} x Top left corner X index (zero based)
 * @param {number?} y Top left corner Y index (zero based)
 * @param {number?} w Number of columns
 * @param {number?} h Number of rows
 */
function cyTable(x, y, w, h) {
  let message
  if (typeof x === 'number' && typeof y === 'number') {
    message = `x:${x},y:${y}`
  }
  if (typeof w === 'number') {
    message += `,w:${w}`
  }
  if (typeof h === 'number') {
    message += `,h:${h}`
  }
  const log = Cypress.log({ name: 'table', message })

  const wSet = typeof w === 'number'
  const hSet = typeof h === 'number'

  return ($table) => {
    const cells = Cypress._.map($table.find('tr'), (tr) => {
      return Cypress._.map(tr.children, 'innerText')
    })

    if (typeof x === 'number' && typeof y === 'number') {
      if (!wSet && cells.length) {
        w = cells[0].length
      }
      if (!hSet) {
        h = cells.length
      }
      const slice = cells.slice(y, y + h).map((row) => {
        return row.slice(x, x + w)
      })
      return slice
    }
    return cells
  }
}

registerQuery('table', cyTable)
