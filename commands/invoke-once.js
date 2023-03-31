/// <reference types="cypress" />

const { registerCommand } = require('./utils')

registerCommand(
  'invokeOnce',
  { prevSubject: true },
  (subject, methodName, ...args) => {
    let message = methodName
    if (args.length) {
      message += ' ' + args.map(JSON.stringify).join(',')
    }

    const log = Cypress.log({ name: 'invokeOnce', message })

    if (typeof subject[methodName] !== 'function') {
      throw new Error(
        `Cannot find method ${methodName} on the current subject`,
      )
    }

    return subject[methodName](...args)
  },
)
