/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('findOne', (predicate) => {
  const logOptions = { name: 'findOne' }
  if (typeof predicate === 'function') {
    logOptions.message = predicate.name
  }
  const log = Cypress.log(logOptions)

  return (subject) => {
    return Cypress._.find(subject, predicate)
  }
})
