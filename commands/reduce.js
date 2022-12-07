/// <reference types="cypress" />

Cypress.Commands.addQuery('reduce', (fn) => {
  return (list) => Cypress._.reduce(list, fn)
})

// hmm, should we have ".max" and ".min" helper query commands?
