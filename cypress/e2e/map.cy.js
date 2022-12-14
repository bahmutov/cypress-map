/// <reference types="cypress" />
// @ts-check

import '../../commands'

const getTexts = ($el) => {
  return Cypress._.map($el, 'innerText')
}

it.skip('confirms the list without retries', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .then(getTexts)
    .should('deep.equal', ['first', 'third', 'fourth'])
})

it('confirms the list', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .map('innerText')
    .should('deep.equal', ['first', 'third', 'fourth'])
})

it('confirms the last element text', () => {
  cy.visit('cypress/index.html')
  // cy.last is a query command
  cy.get('.matching').last().map('innerText').should('deep.equal', ['fourth'])
})

it('confirms the last two elements text', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .map('innerText')
    // cy.invoke is a query command
    .invoke('slice', -2)
    .should('deep.equal', ['third', 'fourth'])
})

it('makes the callback unary', () => {
  cy.wrap(['1', '2', '3', '4']).map(parseInt).should('deep.equal', [1, 2, 3, 4])
})
