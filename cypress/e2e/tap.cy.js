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
    .tap(console.info, 'numbers')
    .should('deep.equal', [1.99, 2.99, 3.99])
})

it('uses console.log by default', () => {
  cy.visit('cypress/prices.html')
  cy.get('#items li')
    .find('.price')
    .map('innerText')
    .tap()
    .mapInvoke('replace', '$', '')
    .tap()
    .map(parseFloat)
    .tap(console.info)
    .should('deep.equal', [1.99, 2.99, 3.99])
})

it('uses console.log by default with a label', () => {
  cy.visit('cypress/prices.html')
  cy.get('#items li')
    .find('.price')
    .map('innerText')
    .tap('text')
    .mapInvoke('replace', '$', '')
    .map(Number)
    .tap('prices')
    .should('deep.equal', [1.99, 2.99, 3.99])
})
