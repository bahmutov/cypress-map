/// <reference types="cypress" />
// @ts-check

import '../../commands'

describe('% notation', () => {
  it('prints a number by default', () => {
    cy.wrap(42)
      .print() // "42"
      // and yields the value
      .should('equal', 42)
  })

  it('prints a string by default', () => {
    cy.wrap('hello')
      .print() // "hello"
      .should('be.a', 'string')
  })

  it('prints an object by default', () => {
    cy.wrap({ name: 'Joe' }).print() // {"name":"Joe"}
  })

  it('formats a number using %d', () => {
    cy.wrap(42)
      .print('the answer is %d') // "the answer is 42"
      .should('equal', 42)
  })

  it('prints an object using %o notation', () => {
    cy.wrap({ name: 'Joe' }).print('person %o') // 'person {"name":"Joe"}'
  })

  it('prints an array of numbers', () => {
    cy.wrap([1, 2, 3]).print()
  })

  it('prints an array of strings', () => {
    cy.wrap(['one', 'two', 'three']).print()
  })
})

describe('{} notation', () => {
  it('prints an object using {0} notation', () => {
    cy.wrap({ name: 'Joe' })
      .print('person {0}') // 'person {"name":"Joe"}'
      .should('deep.equal', { name: 'Joe' })
  })

  it('prints a property using {0.name} notation', () => {
    cy.wrap({ name: 'Joe' })
      .print('person name {0.name}') // "person name Joe"
      .should('deep.equal', { name: 'Joe' })
  })

  it('prints a nested property using {0.foo.bar} notation', () => {
    cy.wrap({ name: { first: 'Joe' } })
      .print('first name is {0.name.first}') // "first name is Joe"
      .its('name.first')
      .should('equal', 'Joe')
  })

  it('prints the length of an array', () => {
    const arr = [1, 2, 3]
    cy.wrap(arr)
      .print('array length {0.length}')
      .its('length')
      .should('equal', 4)
    setTimeout(() => {
      arr.push(4)
    }, 1000)
  })
})

describe('format callback', () => {
  it('passes the subject and prints the result', () => {
    const person = { name: 'Joe' }
    cy.wrap(person)
      .print((p) => `name is ${p.name}`)
      .its('name')
      .should('equal', 'Ann')
    setTimeout(() => {
      person.name = 'Ann'
    }, 1000)
  })

  it('can return an object to be stringified', () => {
    cy.wrap([1, 2, 3]).print((list) => list[1]) // "2"
    cy.wrap({ name: 'Me' }).print((x) => x) // {"name":"Me"}
  })
})
