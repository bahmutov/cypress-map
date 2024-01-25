/// <reference types="cypress" />
// @ts-check
import '../../../src/commands'

beforeEach(() => {
  cy.visit('cypress/e2e/stable/index.html')
})

it('waits for the element text to be stable', () => {
  cy.get('#message').stable('text').should('have.text', 'Hello')
})

it('controls the logging', () => {
  cy.get('#message').stable('text', 1000, { log: false })
})

it('controls the timeout', () => {
  cy.get('#message').stable('text', 5000, { timeout: 10_000 })
})

it('waits for the input value to be stable', () => {
  cy.get('#name').stable('value')
  cy.get('#name', { timeout: 0 }).should('have.value', 'World')
})
