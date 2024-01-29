/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('second', () => {
  const log = Cypress.log({ name: 'second' })

  return (subject) => {
    if (Cypress.dom.isJquery(subject)) {
      return subject[1]
    }

    if (Array.isArray(subject)) {
      return subject[1]
    }

    throw new Error('Expected an array or jQuery object')
  }
})
