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

it('picks N random items', () => {
  const list = ['foo', 'bar', 'baz']
  cy.wrap(list).sample(2).should('have.length', 2)
})

it('picks N random elements', () => {
  cy.visit('cypress/index.html')
  // the first item is immediately in the list
  cy.get('#items li').sample().should('have.text', 'first')
  cy.log('**retries until all items appear**')
  cy.get('#items li')
    .sample(5)
    .should('have.length', 5)
    .and('satisfy', Cypress.dom.isJquery)
    .map('innerText')
    .invoke('sort')
    .should('deep.equal', [
      'fifth',
      'first',
      'fourth',
      'second',
      'third',
    ])
  cy.log('**elements are random**')
  cy.get('#items li').sample(2).map('innerText').print()
})
