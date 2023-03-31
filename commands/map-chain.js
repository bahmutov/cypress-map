/// <reference types="cypress" />

const { registerCommand } = require('./utils')

registerCommand('mapChain', { prevSubject: 'Array' }, (list, fn) => {
  if (!Array.isArray(list)) {
    throw new Error('Expected cy.mapChain subject to be an array')
  }
  const results = []

  const produceValue = (k) => {
    return cy
      .wrap()
      .then(() => fn(list[k], k))
      .then((result) => {
        results.push(result)
        if (k >= list.length - 1) {
          // done
        } else {
          return produceValue(k + 1)
        }
      })
  }

  // make sure we put the possible promises into the command chain
  return cy
    .wrap(results, { log: false })
    .then(() => produceValue(0))
    .then(() => results)
})
