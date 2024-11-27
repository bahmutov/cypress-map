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

// https://github.com/bahmutov/cypress-map/issues/144
it('spreads an array of strings', () => {
  cy.visit('cypress/index.html')
  const selectors = [
    'li:contains("fifth")',
    'li:contains("first")',
    'li:contains("third")',
  ]
  cy.getInOrder(selectors)
    .should('have.length', 3)
    .map('innerText')
    .should('deep.equal', ['fifth', 'first', 'third'])
})

// https://github.com/bahmutov/cypress-map/issues/219
it(
  'uses the current subject',
  { viewportWidth: 500, viewportHeight: 500 },
  () => {
    cy.visit('cypress/e2e/filter-table/index.html')
    cy.get('table tbody tr').should('have.length', 5)
    cy.get('table tbody tr:eq(2)')
      .should('include.text', 'Dave')
      // get the age and the name cells
      .getInOrder('td:eq(2)', 'td:eq(0)')
      .map('innerText')
      .should('deep.equal', ['25', 'Dave'])
  },
)
