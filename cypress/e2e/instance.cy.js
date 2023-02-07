/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('checks instance of array', () => {
  expect([1, 2, 3]).to.be.an.instanceOf(Array)
})

it('works before cy.map', () => {
  cy.wrap(['one', 'a', 'four']).should('be.an.instanceOf', Array)
})

it('maps to an array', () => {
  cy.wrap(['one', 'a', 'four'])
    .should('be.an.instanceOf', Array)
    .map('length')
    .should('deep.equal', [3, 1, 4])
    .and('be.an', 'array')
    .and('be.an.instanceOf', Array)
})
