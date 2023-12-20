/// <reference types="cypress" />
// @ts-check

import '../../commands'

const getTexts = ($el) => {
  return Cypress._.map($el, 'innerText')
}

it.skip('confirms the list without retries', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .then(getTexts)
    .should('deep.equal', ['first', 'third', 'fourth'])
})

it('confirms the list', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .map('innerText')
    .should('deep.equal', ['first', 'third', 'fourth'])
})

it('confirms the last element text', () => {
  cy.visit('cypress/index.html')
  // cy.last is a query command
  cy.get('.matching')
    .last()
    .map('innerText')
    .should('deep.equal', ['fourth'])
})

it('confirms the last two elements text', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .map('innerText')
    // cy.invoke is a query command
    .invoke('slice', -2)
    .should('deep.equal', ['third', 'fourth'])
})

it('makes the callback unary', () => {
  cy.wrap(['1', '2', '3', '4'])
    .map(parseInt)
    .should('deep.equal', [1, 2, 3, 4])
})

it('verifies that LI elements include 3 strings', () => {
  // let's say we do not care the order of strings, just that
  // the list includes strings "first", "fifth", "third"
  // in any order
  cy.visit('cypress/index.html')
  cy.get('li')
    .map('innerText')
    .should('include.members', ['first', 'fifth', 'third'])
})

it('maps properties of an object', () => {
  cy.wrap({
    age: '42',
    lucky: true,
  })
    // cast the property "age" to a number
    // by running it through the "Number" function
    .map({
      age: Number,
      lucky: Cypress._.identity,
    })
    .should('deep.equal', {
      age: 42,
      lucky: true,
    })
})

// https://github.com/bahmutov/cypress-map/issues/110
it('picks the listed properties of the subject', () => {
  const person = {
    name: 'Joe',
    age: 21,
    occupation: 'student',
  }
  cy.wrap(person, { timeout: 0 })
    .map(['name', 'age'])
    .should('deep.equal', {
      name: 'Joe',
      age: 21,
    })
})

it('retries to find the picked properties', () => {
  const person = {}
  setTimeout(() => {
    person.name = 'Joe'
    person.occupation = 'student'
    person.age = 21
  }, 1000)
  cy.wrap(person, { timeout: 1100 })
    .map(['name', 'age'])
    .should('deep.equal', {
      name: 'Joe',
      age: 21,
    })
})

it('maps nested paths', () => {
  const people = [
    {
      name: {
        first: 'Joe',
        last: 'Smith',
      },
    },
    {
      name: {
        first: 'Anna',
        last: 'Kova',
      },
    },
  ]
  cy.wrap(people)
    .map('name.first')
    .should('deep.equal', ['Joe', 'Anna'])
})

it('respects the timeout option', () => {
  const people = [
    {
      name: {
        first: 'Joe',
        last: 'Smith',
      },
    },
  ]
  setTimeout(() => {
    people.push({
      name: {
        first: 'Anna',
        last: 'Kova',
      },
    })
  }, 6000)
  cy.wrap(people)
    .map('name.first', { timeout: 7_000 })
    .should('deep.equal', ['Joe', 'Anna'])
})

it('respects the timeout option from the parent command', () => {
  const people = [
    {
      name: {
        first: 'Joe',
        last: 'Smith',
      },
    },
  ]
  setTimeout(() => {
    people.push({
      name: {
        first: 'Anna',
        last: 'Kova',
      },
    })
  }, 6000)
  cy.wrap(people, { timeout: 10_000 })
    .map('name') // should use the timeout from the parent command
    .map('first') // should use the timeout from the parent command
    .should('deep.equal', ['Joe', 'Anna'])
})

// enable only to see the thrown errors
// https://github.com/bahmutov/cypress-map/issues/74
describe.skip(
  'invalid subjects',
  { defaultCommandTimeout: 0 },
  () => {
    it('throws on a string', () => {
      cy.wrap('hello').map(parseInt).print()
    })

    it('throws on a number', () => {
      cy.wrap(42).map(parseInt).print()
    })

    it('throws on a boolean', () => {
      cy.wrap(true).map(parseInt).print()
    })
  },
)
