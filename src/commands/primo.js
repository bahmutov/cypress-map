/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('primo', () => {
  const log = Cypress.log({ name: 'primo' })

  return (subject) => {
    if (Cypress.dom.isJquery(subject)) {
      return subject[0]
    }
    if (Array.isArray(subject)) {
      return subject[0]
    }
    throw new Error('Not sure how to pick the first item')
  }
})
