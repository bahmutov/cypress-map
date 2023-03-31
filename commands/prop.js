/// <reference types="cypress" />

const { registerQueryCommand } = require('./utils')

registerQueryCommand('prop', (propertyName) => {
  const log = Cypress.log({ name: 'prop', message: propertyName })

  return (subject) => {
    if (Cypress.dom.isJquery(subject)) {
      return subject.prop(propertyName)
    }
    return subject[propertyName]
  }
})
