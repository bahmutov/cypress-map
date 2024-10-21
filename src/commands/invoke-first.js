/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('invokeFirst', function (methodName, ...args) {
  let message = methodName
  if (args.length) {
    message += ' ' + args.map((x) => JSON.stringify(x)).join(', ')
  }
  const log = Cypress.log({ name: 'invokeFirst', message })

  return ($el) => {
    const first = $el[0]
    return first[methodName].apply(first, args)
  }
})
