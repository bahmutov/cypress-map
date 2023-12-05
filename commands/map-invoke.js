/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('mapInvoke', function (methodName, ...args) {
  if (args.length > 0) {
    const lastArgument = args.at(-1)
    if (
      lastArgument &&
      Cypress._.isFinite(lastArgument.timeout) &&
      lastArgument.timeout > 0
    ) {
      // make sure this query command respects the timeout option
      this.set('timeout', lastArgument.timeout)
    }
  }

  let message = methodName
  if (args.length) {
    message += ' ' + args.map((x) => JSON.stringify(x)).join(', ')
  }
  const log = Cypress.log({ name: 'mapInvoke', message })

  return (list) =>
    Cypress._.map(list, (item) => item[methodName].apply(item, args))
})
