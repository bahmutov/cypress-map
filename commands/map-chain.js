/// <reference types="cypress" />

Cypress.Commands.add(
  'mapChain',
  { prevSubject: 'Array' },
  (list, fn) => {
    if (!Array.isArray(list)) {
      throw new Error('Expected cy.mapChain subject to be an array')
    }
    const results = []

    const produceValue = (k) => {
      cy.wrap()
        .then(() => fn(list[k], k))
        .then((r) => {
          // if the function returned a Promise
          // or "cy" chainable
          if (typeof r === 'object' && 'then' in r) {
            return r.then((result) => {
              // console.log(k, list[k], result)
              results.push(result)
              if (k >= list.length - 1) {
                // done
              } else {
                return produceValue(k + 1)
              }
            })
          } else {
            // user function is plain
            // console.log(k, list[k], r)
            results.push(r)
            if (k >= list.length - 1) {
              // done
            } else {
              return produceValue(k + 1)
            }
          }
        })
    }

    // make sure we put the possible promises into the command chain
    cy.wrap(results, { log: false })
      .then(() => produceValue(0))
      .then(() => results)
  },
)
