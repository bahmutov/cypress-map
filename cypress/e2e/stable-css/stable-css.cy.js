/// <reference types="cypress" />
// @ts-check
import '../../../src/commands'

beforeEach(() => {
  cy.visit('cypress/e2e/stable-css/index.html')
})

it('waits for the color using have.css', () => {
  cy.contains('button', 'Click to show').click()
  cy.get('#message').should(
    'have.css',
    'background-color',
    'rgb(255, 0, 0)',
  )
})

it('waits for the color to be stable using cy.invoke retries', () => {
  cy.contains('button', 'Click to show').click()
  // retries until the CSS animation finishes
  // and the background color is red
  cy.get('#message')
    .invoke('css', 'background-color')
    .should('equal', 'rgb(255, 0, 0)')
})

it('waits for the color to be stable using cy.stable', () => {
  cy.contains('button', 'Click to show').click()
  // retries until the CSS animation finishes
  // and the background color is red
  cy.get('#message')
    .stable('css', 'background-color', 100)
    // yields the element
    .should('have.css', 'background-color', 'rgb(255, 0, 0)')
})

it('waits for the text color to be stable using cy.stable', () => {
  cy.contains('button', 'Click to show').click()
  cy.get('#message')
    .stable('css', 'color', 100)
    .should('have.css', 'color', 'rgb(255, 255, 255)')
})
