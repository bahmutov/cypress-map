/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('apply', (callback, ...args) => {
  if (typeof callback !== 'function') {
    throw new Error('Expected a function to apply')
  }

  const log = Cypress.log({ name: 'apply', message: callback.name })

  return (subject) => {
    log.set({
      $el: subject,
    })
    return callback(...args, subject)
  }
})

registerQuery('applyRight', (callback, ...args) => {
  if (typeof callback !== 'function') {
    throw new Error('Expected a function to apply')
  }

  const log = Cypress.log({ name: 'apply', message: callback.name })

  return (subject) => {
    log.set({
      $el: subject,
    })
    return callback(subject, ...args)
  }
})
