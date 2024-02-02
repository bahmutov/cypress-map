/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('make', (constructorFn) => {
  if (typeof constructorFn !== 'function') {
    throw new Error('Expected a function')
  }

  const log = Cypress.log({
    name: 'make',
    message: constructorFn.name,
  })

  return (subject) => {
    return new constructorFn(subject)
  }
})
