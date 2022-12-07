/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('confirms the prices', () => {
  cy.visit('cypress/prices.html')
  cy.get('#items li')
    .find('.price')
    .map('innerText')
    .mapInvoke('replace', '$', '')
    .map(parseFloat)
    .should('deep.equal', [1.99, 2.99, 3.99])
})
