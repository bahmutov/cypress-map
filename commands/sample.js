/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('sample', () => {
  const log = Cypress.log({ name: 'sample' })

  return (subject) => {
    if (Cypress.dom.isJquery(subject)) {
      const randomElement = Cypress._.sample(subject.toArray())
      // wrap into jQuery object so other commands
      // can be attached, like cy.click
      return Cypress.$(randomElement)
    }

    return Cypress._.sample(subject)
  }
})
