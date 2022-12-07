/// <reference types="cypress" />

Cypress.Commands.addQuery('tap', (fn = console.log, label = undefined) => {
  const logName = 'tap ' + (label ? label : fn.name)
  const log = Cypress.log({ name: logName })

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
