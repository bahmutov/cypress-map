/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('invokes a method on the subject', () => {
  const list = ['apples', 'plums', 'bananas']
  cy.wrap(list)
    // calls ".sort()" on the list
    .invoke('sort')
    .should('deep.equal', ['apples', 'bananas', 'plums'])
})

it('invokes a method on the items in the subject', () => {
  const list = ['apples', 'plums', 'bananas']
  cy.wrap(list)
    // calls ".toUpperCase()" on every string in the list
    .mapInvoke('toUpperCase')
    .should('deep.equal', ['APPLES', 'PLUMS', 'BANANAS'])
})

it('maps each item by running it through the callback or property', () => {
  const list = ['apples', 'plums', 'bananas']
  const reverse = (s) => s.split('').reverse().join('')
  cy.wrap(list)
    // reverses each string in the list
    .map(reverse)
    .should('deep.equal', ['selppa', 'smulp', 'sananab'])
    // reverses each string in the list
    .map('length')
    .should('deep.equal', [6, 5, 7])
})
