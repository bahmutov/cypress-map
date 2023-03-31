/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('mapInvoke', (methodName, ...args) => {
  let message = methodName
  if (args.length) {
    message += ' ' + args.map((x) => JSON.stringify(x)).join(', ')
  }
  const log = Cypress.log({ name: 'mapInvoke', message })

  return (list) =>
    Cypress._.map(list, (item) => item[methodName].apply(item, args))
})
