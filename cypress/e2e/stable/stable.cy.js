/// <reference types="cypress" />
// @ts-check
import '../../../src/commands'

it('waits for the element text to be stable', () => {
  cy.visit('cypress/e2e/stable/index.html')
  cy.get('#message').stable('text').should('have.text', 'Hello')
})

// TODO: add timeout option
it.skip('controls the timeout', () => {
  cy.visit('cypress/e2e/stable/index.html')
  cy.get('#message').stable('text', 5000)
})
