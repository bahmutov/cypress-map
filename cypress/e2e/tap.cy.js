/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('confirms the prices', () => {
  cy.visit('cypress/prices.html')
  cy.get('#items li')
    .find('.price')
    .map('innerText')
    .tap(console.log, 'text')
    .mapInvoke('replace', '$', '')
    .tap(console.log, 'without $')
    .map(parseFloat)
    .tap(console.log, 'numbers')
    .should('deep.equal', [1.99, 2.99, 3.99])
})
