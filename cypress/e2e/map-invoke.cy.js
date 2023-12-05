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

it('respects the timeout option', () => {
  const strings = []
  setTimeout(() => {
    strings.push('a')
  }, 1000)
  setTimeout(() => {
    strings.push('b')
  }, 2000)
  setTimeout(() => {
    strings.push('c')
  }, 3000)
  setTimeout(() => {
    strings.push('d')
  }, 4000)
  setTimeout(() => {
    strings.push('e')
  }, 5000)
  setTimeout(() => {
    strings.push('f')
  }, 6000)
  setTimeout(() => {
    strings.push('g')
  }, 7000)
  cy.wrap(strings)
    .mapInvoke('toUpperCase', { timeout: 10_000 })
    .should('deep.equal', ['A', 'B', 'C', 'D', 'E', 'F', 'G'])
})
