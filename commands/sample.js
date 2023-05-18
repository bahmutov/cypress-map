/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('sample', () => {
  const log = Cypress.log({ name: 'sample' })

  return (subject) => {
    if (Cypress.dom.isJquery(subject)) {
      return Cypress._.sample(subject.toArray())
    }

    return Cypress._.sample(subject)
  }
})
