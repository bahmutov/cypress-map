/// <reference types="cypress" />
// @ts-check

import '../../commands'

chai.config.truncateThreshold = 300

it('compares two different objects', () => {
  cy.wrap({ name: 'Joe', age: 20 })
    .difference({ name: 'Joe', age: 30 })
    .should('deep.equal', { age: { actual: 20, expected: 30 } })
})

it('compares two identical objects', () => {
  cy.wrap({ name: 'Joe', age: 20 })
    .difference({ name: 'Joe', age: 20 })
    .should('deep.equal', {})
})

it('retries when comparing', () => {
  const p = { name: 'Joe' }
  setTimeout(() => {
    p.age = 20
  }, 200)
  cy.wrap(p)
    .difference({ name: 'Joe', age: 20 })
    .should('deep.equal', {})
})

it('reports a missing property', () => {
  cy.wrap({ name: 'Joe', age: 20 })
    .difference({ name: 'Joe', age: 20, extra: true })
    .should('deep.equal', {
      extra: { missing: true, expected: true },
    })
})

it('reports extra property', () => {
  cy.wrap({ name: 'Joe', age: 20, extra: true })
    .difference({ name: 'Joe', age: 20 })
    .should('deep.equal', {
      extra: { extra: true, actual: true },
    })
})
