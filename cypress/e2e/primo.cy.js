/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('converts the first item text to uppercase', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .map('innerText')
    .primo()
    .invoke('toUpperCase')
    .should('equal', 'FIRST')
})

it('yields the first DOM element', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .primo()
    .invoke('getAttributeNames')
    .should('deep.equal', ['class'])
})
