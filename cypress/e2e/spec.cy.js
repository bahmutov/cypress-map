/// <reference types="cypress" />

const getTexts = ($el) => {
  return Cypress._.map($el, 'innerText')
}

it.skip('confirms the list without retries', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .then(getTexts)
    .should('deep.equal', ['first', 'third', 'fourth'])
})

// Cypress.Commands.addQuery('map', (fn) => {
//   return (subject) => fn(subject)
// })

Cypress.Commands.addQuery('map', (fnOrProperty) => {
  return ($el) => Cypress._.map($el, fnOrProperty)
})

Cypress.Commands.addQuery('mapInvoke', (methodName, ...args) => {
  return (list) =>
    Cypress._.map(list, (item) => item[methodName].apply(item, args))
})

Cypress.Commands.addQuery('tap', (fn = console.log, label = undefined) => {
  const logName = 'tap ' + (label ? label : fn.name)
  const log = Cypress.log({ name: logName })

  return (subject) => {
    log.set({
      $el: subject,
    })

    fn(subject)
    return subject
  }
})

it('confirms the list', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .map('innerText')
    .should('deep.equal', ['first', 'third', 'fourth'])
})

it('confirms the prices', () => {
  cy.visit('cypress/prices.html')
  cy.get('#items li')
    .find('.price')
    .map('innerText')
    .tap(console.log, 'text')
    .mapInvoke('replace', '$', '')
    .tap(console.log, 'without $')
    .map(parseFloat)
    .tap(console.log, 'numbers')
    .should('deep.equal', [1.99, 2.99, 3.99])
})
