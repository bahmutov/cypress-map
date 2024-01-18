/// <reference types="cypress" />
// @ts-check
import '../../../src/commands'

it('waits for the element text to be stable', () => {
  cy.visit('cypress/e2e/stable/index.html')
  cy.get('#message').stable('text').should('have.text', 'Hello')
})

it('controls the logging', () => {
  cy.visit('cypress/e2e/stable/index.html')
  cy.get('#message').stable('text', 1000, { log: false })
})

it('controls the timeout', () => {
  cy.visit('cypress/e2e/stable/index.html')
  cy.get('#message').stable('text', 5000, { timeout: 10_000 })
})
