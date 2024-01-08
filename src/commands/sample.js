/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('sample', (n = 1) => {
  if (n < 1) {
    throw new Error(`Sample size should be positive, was ${n}`)
  }

  if (n === 1) {
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
  } else {
    const log = Cypress.log({ name: 'sample', message: String(n) })

    return (subject) => {
      if (Cypress.dom.isJquery(subject)) {
        const randomElement = Cypress._.sampleSize(
          subject.toArray(),
          n,
        )
        // wrap into jQuery object so other commands
        // can be attached, like cy.click
        return Cypress.$(randomElement)
      }

      return Cypress._.sampleSize(subject, n)
    }
  }
})
