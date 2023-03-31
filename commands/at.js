/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('at', (index) => {
  if (typeof index !== 'number') {
    throw new Error(`Invalid cy.at index ${index}`)
  }
  const log = Cypress.log({ name: 'at', message: String(index) })

  return (subject) => {
    if (Cypress.dom.isJquery(subject) || Array.isArray(subject)) {
      if (index < 0) {
        return subject[subject.length + index]
      }
      return subject[index]
    }
    throw new Error(`Not sure how to pick the item at ${index}`)
  }
})
