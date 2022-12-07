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
  if (typeof fnOrProperty === 'string') {
    return ($el) => Cypress._.map($el, fnOrProperty)
  }
  if (typeof fnOrProperty === 'function') {
    return (subject) => fnOrProperty(subject)
  }

  throw new Error('Not sure how to map...')
})

it.only('confirms the test', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .map('innerText')
    .should('deep.equal', ['first', 'third', 'fourth'])
})
