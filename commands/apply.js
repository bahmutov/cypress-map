/// <reference types="cypress" />

const { registerQueryCommand } = require('./utils')

registerQueryCommand('apply', (callback) => {
  if (typeof callback !== 'function') {
    throw new Error('Expected a function to apply')
  }

  const log = Cypress.log({ name: 'apply', message: callback.name })

  return (subject) => {
    log.set({
      $el: subject,
    })
    return callback(subject)
  }
})
