/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('does not have saved value yet', () => {
  expect(Cypress.env('greeting'), 'greeting is undefined').to.be
    .undefined
})

it('saves value in this test', () => {
  cy.wrap('hello, world').asEnv('greeting')
})

it('saved value is available in this test', () => {
  expect(Cypress.env('greeting'), 'greeting').to.equal('hello, world')
})

it('saved value is available in this test too', () => {
  expect(Cypress.env('greeting'), 'greeting').to.equal('hello, world')
})
