/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('asEnv', (name) => {
  if (typeof name !== 'string') {
    throw new Error(`Invalid cy.asEnv name ${index}`)
  }
  if (!name) {
    throw new Error(`Empty cy.asEnv name`)
  }

  const log = Cypress.log({ name: 'asEnv', message: name })

  return (subject) => {
    if (Cypress._.isNil(subject)) {
      throw new Error('No subject to save cy.asEnv')
    }
    Cypress.env(name, subject)
    return subject
  }
})
