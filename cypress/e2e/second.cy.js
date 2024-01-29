/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

import '../../commands'

it('picks the second item in the list', () => {
  const list = ['foo', 'bar', 'baz']
  cy.wrap(list).second().should('equal', 'bar')
})

it('yields the second element', () => {
  cy.visit('cypress/index.html')
  cy.get('#items li').second().should('have.text', 'second')
})

it('yields the second element with retries', () => {
  cy.visit('cypress/index.html')
  // the element appears only after a delay
  cy.get('#items li:not(.matching)')
    .second()
    .should('have.text', 'fifth')
})
