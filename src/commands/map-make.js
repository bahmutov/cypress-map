/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('mapMake', function (constructorFn, ...args) {
  if (typeof constructorFn !== 'function') {
    throw new Error('Expected a function')
  }

  let message = constructorFn.name || 'anonymous'
  if (args.length) {
    message += ' ' + args.map((x) => JSON.stringify(x)).join(', ')
  }
  const log = Cypress.log({ name: 'mapMake', message })
  return (list) =>
    Cypress._.map(list, (item) => new constructorFn(item, ...args))
})
