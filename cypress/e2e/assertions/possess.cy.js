/// <reference types="cypress" />
// @ts-check

import '../../../src/commands'

describe('have.property assertion', () => {
  it('yields the property value', () => {
    cy.wrap({ foo: 'bar' })
      .should('have.property', 'foo')
      .should('equal', 'bar')
  })
})

describe('should possess assertion', () => {
  it('checks if the subject possesses a property', () => {
    cy.wrap({ foo: 'bar' })
      .should('possess', 'foo')
      .and('not.possess', 'fooz')
  })

  it('yields the subject', () => {
    cy.wrap({ foo: 'bar' })
      .should('possess', 'foo')
      .should('deep.equal', { foo: 'bar' })
  })

  it('checks the property value', () => {
    cy.wrap({ foo: 'bar' })
      .should('possess', 'foo', 'bar')
      // still yields the original subject
      .should('deep.equal', { foo: 'bar' })

    cy.wrap({ foo: 42 }).should('possess', 'foo', 42)
  })

  it('checks the property value using not', () => {
    cy.wrap({ foo: 'bar' }).should('not.possess', 'foo', 'BAR')
  })

  it('checks the property presence using not and value', () => {
    cy.wrap({ foo: 'bar' }).should(
      'not.possess',
      'some-other-name',
      'BAR',
    )
  })

  it('supports nested properties', () => {
    const person = { name: { first: 'Joe' } }
    cy.wrap(person)
      .should('possess', 'name.first', 'Joe')
      // still yields the original subject
      .should('deep.equal', person)
  })

  it('supports arrays', () => {
    const counts = [1, 2, 3]
    cy.wrap(counts)
      .should('possess', '1', 2)
      // still yields the original subject
      .should('deep.equal', counts)
      .should('possess', 'length', 3)
  })

  it('supports mixing arrays and objects', () => {
    cy.wrap([
      { sum: 42 },
      { sum: 101 },
      { sum: { errors: ['Invalid operation'] } },
    ]).should('possess', '2.sum.errors.0', 'Invalid operation')
  })

  it('supports array bracket notation', () => {
    cy.wrap([
      { sum: 42 },
      { sum: 101 },
      { sum: { errors: ['Invalid operation'] } },
    ]).should('possess', '[2].sum.errors[0]', 'Invalid operation')
  })

  // unskip to see the thrown error
  it.skip('throws an error', () => {
    cy.wrap({ foo: 'bar' })
      // @ts-ignore
      .should('possess', 'foo', 'bar', 123)
      .should('deep.equal', { foo: 'bar' })
  })
})
