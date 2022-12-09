/// <reference types="cypress" />

Cypress.Commands.addQuery('reduce', (fn, initialValue) => {
  // see https://lodash.com/docs/ _.reduce documentation
  if (typeof initialValue !== 'undefined') {
    return (list) => Cypress._.reduce(list, fn, initialValue)
  } else {
    return (list) => Cypress._.reduce(list, fn)
  }
})

// hmm, should we have ".max" and ".min" helper query commands?
