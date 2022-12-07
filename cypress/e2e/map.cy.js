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
