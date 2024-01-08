/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('update', (prop, callback) => {
  if (typeof callback !== 'function') {
    throw new Error('Expected a function to apply')
  }

  const log = Cypress.log({
    name: 'update',
    message: `${prop} by ${callback.name}`,
  })

  return (subject) => {
    log.set({
      $el: subject,
    })

    return { ...subject, [prop]: callback(subject[prop]) }
  }
})
