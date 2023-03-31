/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('tap', (fn = console.log, label = undefined) => {
  if (typeof fn === 'string') {
    // the user passed the label only, like
    // cy.tap('numbers')
    label = fn
    fn = console.log
  }

  const logName = label ? label : fn.name
  const log = Cypress.log({ name: 'tap', message: logName })

  return (subject) => {
    log.set({
      $el: subject,
    })

    if (typeof label === 'string') {
      fn(label, subject)
    } else {
      fn(subject)
    }
    return subject
  }
})
