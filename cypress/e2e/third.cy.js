/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

import '../../commands'

it('picks the third item in the list', () => {
  const list = ['foo', 'bar', 'baz']
  cy.wrap(list).third().should('equal', 'baz')
})

it('yields the third element', () => {
  cy.visit('cypress/index.html')
  cy.get('#items li').third().should('have.text', 'third')
})

it('yields the third element with retries', () => {
  cy.visit('cypress/index.html')
  // the element appears only after a delay
  cy.get('#items li.matching').third().should('have.text', 'fourth')
})
