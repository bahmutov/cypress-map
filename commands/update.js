/// <reference types="cypress" />

Cypress.Commands.addQuery('update', (prop, callback) => {
  if (typeof callback !== 'function') {
    throw new Error('Expected a function to apply')
  }

  const log = Cypress.log({
    name: 'update',
    message: `${prop} with ${callback.name}`,
  })

  return (subject) => {
    log.set({
      $el: subject,
    })

    return { ...subject, [prop]: callback(subject[prop]) }
  }
})
