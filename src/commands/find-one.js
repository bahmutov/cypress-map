/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('findOne', (predicate) => {
  const logOptions = { name: 'findOne' }
  if (typeof predicate === 'function') {
    logOptions.message = predicate.name
  } else if (typeof predicate === 'string') {
    logOptions.message = `text: "${predicate}"`
  }
  const log = Cypress.log(logOptions)

  return (subject) => {
    if (typeof predicate === 'string') {
      return Cypress._.find(
        subject,
        (el) => el.innerText === predicate,
      )
    } else {
      return Cypress._.find(subject, predicate)
    }
  }
})
