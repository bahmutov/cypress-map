/// <reference types="cypress" />

const { registerCommand } = require('./utils')

registerCommand(
  'mapChain',
  { prevSubject: 'Array' },
  (list, fn, predicate) => {
    if (!Array.isArray(list) && !Cypress.dom.isJquery(list)) {
      throw new Error(
        'Expected cy.mapChain subject to be an array or jQuery object',
      )
    }
    if (!list.length) {
      // if there are items in the list
      // can quickly move on
      return []
    }

    const results = []

    const produceValue = (k) => {
      const item = list[k]
      return (
        cy
          .wrap(null, { log: false })
          // pass both the item and its index into the callback
          .then(() => fn(item, k))
          .then((result) => {
            results.push(result)
            if (predicate && predicate({ item, index: k, result })) {
              // stop processing
              return
            }

            if (k >= list.length - 1) {
              // done
            } else {
              return produceValue(k + 1)
            }
          })
      )
    }

    // make sure we put the possible promises into the command chain
    return cy
      .wrap(results, { log: false })
      .then(() => produceValue(0), { log: false })
      .then(() => results)
  },
)
