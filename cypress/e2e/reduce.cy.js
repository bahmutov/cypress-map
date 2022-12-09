/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('confirms the highest price', () => {
  cy.visit('cypress/prices.html')
  cy.get('#items li')
    .find('.price')
    .map('innerText')
    .mapInvoke('replace', '$', '')
    .map(parseFloat)
    .reduce((max, price) => (price > max ? price : max))
    .should('equal', 3.99)
})

it('work with wrapped array', () => {
  cy.wrap([1, 10, 2, 5, 3])
    .reduce((max, n) => (n > max ? n : max))
    .should('equal', 10)
})

it('work with wrapped array with async added items', () => {
  const list = [1, 2, 5, 3]
  cy.wrap(list)
    .reduce((max, n) => (n > max ? n : max))
    .should('equal', 10)
  setTimeout(() => {
    list.push(10)
  }, 1000)
})

it('uses the initial value', () => {
  cy.wrap([1, 2, 3])
    .reduce((sum, n) => sum + n, 10)
    .should('equal', 16)
})
