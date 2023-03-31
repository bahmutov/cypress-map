/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('reduce', (fn, initialValue) => {
  if (typeof fn !== 'function') {
    throw new Error('Expected a function to apply')
  }

  let message = fn.name
  if (typeof initialValue !== 'undefined') {
    message += ', ' + initialValue
  }
  const log = Cypress.log({ name: 'reduce', message })

  // see https://lodash.com/docs/ _.reduce documentation
  if (typeof initialValue !== 'undefined') {
    return (list) => Cypress._.reduce(list, fn, initialValue)
  } else {
    return (list) => Cypress._.reduce(list, fn)
  }
})

// hmm, should we have ".max" and ".min" helper query commands?
