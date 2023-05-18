/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('picks a random item from the list', () => {
  const list = ['foo', 'bar', 'baz']
  cy.wrap(list).sample().should('be.oneOf', list)
})

it('picks a random element', () => {
  cy.visit('cypress/index.html')
  // the first item is immediately in the list
  cy.get('#items li').sample().should('have.text', 'first')
  cy.log('**retries until the item appears and is picked**')
  cy.get('#items li').sample().should('have.text', 'fifth')
})
