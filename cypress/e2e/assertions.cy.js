/// <reference types="cypress" />
// @ts-check

import '../../src/commands'

it('compares text', () => {
  cy.visit('cypress/index.html')
  cy.get('li').first().should('read', 'first')
  cy.get('li').should('read', ['first', 'second', 'third'])
  // passes after delay
  cy.get('li').should('read', [
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
  ])
})
