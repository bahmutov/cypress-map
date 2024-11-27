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

it('supports a single regular expression', () => {
  cy.visit('cypress/index.html')
  cy.get('li').first().should('read', /FIRST/i)
})

it('supports a mixture of strings and regular expressions', () => {
  cy.visit('cypress/index.html')
  cy.get('li').should('read', ['first', /^sec/, 'third'])
})
