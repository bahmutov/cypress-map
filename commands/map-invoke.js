/// <reference types="cypress" />

Cypress.Commands.addQuery('mapInvoke', (methodName, ...args) => {
  return (list) =>
    Cypress._.map(list, (item) => item[methodName].apply(item, args))
})
