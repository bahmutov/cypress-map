/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('table', (x, y, w, h) => {
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

  return ($table) => {
    const cells = Cypress._.map($table.find('tr'), (tr) => {
      return Cypress._.map(tr.children, 'innerText')
    })

    if (typeof x === 'number' && typeof y === 'number') {
      if (typeof w === 'undefined' && cells.length) {
        w = cells[0].length
      }
      if (typeof h === 'undefined') {
        h = cells.length
      }
      const slice = cells.slice(y, y + h).map((row) => {
        return row.slice(x, x + w)
      })
      return slice
    }
    return cells
  }
})
