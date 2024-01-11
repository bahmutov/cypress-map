/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

import '../../commands'

it('queries the elements in the given order', () => {
  cy.visit('cypress/index.html')
  cy.getInOrder('li:contains("second")', 'li:contains("first")')
    .map('innerText')
    .should('deep.equal', ['second', 'first'])
})

it('retries each selector', () => {
  cy.visit('cypress/index.html')
  cy.getInOrder(
    'li:contains("fifth")',
    'li:contains("first")',
    'li:contains("third")',
  )
    .should('have.length', 3)
    .map('innerText')
    .should('deep.equal', ['fifth', 'first', 'third'])
})

it('OR selector', () => {
  cy.visit('cypress/index.html')
  // the OR selector is a comma and it returns
  // elements in the order they appear in the DOM
  // NOT in the order of the selectors
  cy.get(
    'li:contains("fifth"),li:contains("first"),li:contains("third")',
  )
    .should('have.length', 3)
    .map('innerText')
    // the order is the same as in the DOM
    .should('deep.equal', ['first', 'third', 'fifth'])
})
