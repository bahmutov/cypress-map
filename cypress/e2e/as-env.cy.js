/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('does not have saved value yet', () => {
  expect(Cypress.env('greeting'), 'greeting is undefined').to.be
    .undefined
})

it('saves value in this test', () => {
  cy.wrap('hello, world')
    .asEnv('greeting')
    // the value is yielded to the next command
    .should('equal', 'hello, world')
})

it('saved value is available in this test', () => {
  expect(Cypress.env('greeting'), 'greeting').to.equal('hello, world')
})

it('saved value is available in this test too', () => {
  expect(Cypress.env('greeting'), 'greeting').to.equal('hello, world')
})

it('retries like all queries', () => {
  const person = {}
  setTimeout(() => {
    person.name = 'Joe'
  }, 1000)
  cy.wrap(person)
    .asEnv('person')
    .its('name')
    .should('equal', 'Joe')
    .then(() => {
      expect(Cypress.env('person'), 'person').to.have.property(
        'name',
        'Joe',
      )
    })
})
