/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('partial', (callback, ...knownArguments) => {
  if (typeof callback !== 'function') {
    throw new Error('Expected a function to partially apply')
  }

  const applied = callback.bind(null, ...knownArguments)
  const log = Cypress.log({
    name: 'partial',
    message: `${callback.name} with ${knownArguments.join(',')}`,
  })

  return (subject) => {
    log.set({
      $el: subject,
    })

    return applied(subject)
  }
})
