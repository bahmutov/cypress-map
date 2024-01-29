/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('third', () => {
  const log = Cypress.log({ name: 'third' })

  return (subject) => {
    if (Cypress.dom.isJquery(subject)) {
      return subject[2]
    }

    if (Array.isArray(subject)) {
      return subject[2]
    }

    throw new Error('Expected an array or jQuery object')
  }
})
