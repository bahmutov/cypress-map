/// <reference path="../../src/commands/index.d.ts" />
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

describe('predicates', () => {
  it('allows to use custom predicates', () => {
    cy.wrap({ name: 'Joe', age: 20 })
      .difference({ name: 'Joe', age: (n) => n > 15 })
      .should('deep.equal', {})
  })

  it('checks the number', () => {
    cy.wrap({ name: 'Joe', age: 20 })
      .difference({ name: 'Joe', age: Cypress._.isNumber })
      .should('deep.equal', {})
  })
})

describe('compares two arrays', () => {
  it('compares two equal arrays', () => {
    cy.wrap([1, 2, 3]).difference([1, 2, 3]).should('be.empty')
  })

  it('compares two different arrays', () => {
    cy.wrap([1, 2, 3])
      .difference([1, 2, 4])
      .should('deep.equal', { 2: { actual: 3, expected: 4 } })
  })

  it('compares two arrays that become equal', () => {
    const list = []
    cy.wrap(list).difference([1, 2, 3]).should('be.empty')
    setTimeout(() => {
      list.push(1, 2, 3)
    }, 200)
  })

  it('compares two arrays with predicates', () => {
    const list = []
    cy.wrap(list)
      .difference([
        Cypress._.isNumber,
        (x) => x === 'foo',
        (x) => x === 'bar',
      ])
      .should('be.empty')
    setTimeout(() => {
      list.push(1)
    }, 200)
    setTimeout(() => {
      list.push('foo')
    }, 400)
    setTimeout(() => {
      list.push('bar')
    }, 600)
  })
})
