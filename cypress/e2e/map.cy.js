/// <reference types="cypress" />
// @ts-check

import '../../src/commands'

// print the full assertions for easier debugging
chai.config.truncateThreshold = 0

/**
 * @param {JQuery<HTMLElement>} $el
 * @returns {string[]}
 */
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

describe('casting', () => {
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

  it('maps properties of each object in an array', () => {
    const people = [
      { name: 'Joe', age: '21' },
      { name: 'Anna', age: '22' },
    ]
    cy.wrap(people)
      // cast the property "age" to a number
      // by running it through the "Number" function
      // TODO: check the yielded subject type
      // to be the array of objects with merged and casted properties
      .map(
        {
          age: Number,
        },
        { timeout: 0 },
      )
      .should('deep.equal', [
        { name: 'Joe', age: 21 },
        { name: 'Anna', age: 22 },
      ])
  })
})

describe('Picking properties', () => {
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
    /**
     * @type {{name?: string, age?: number, occupation?: string}}
     */
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

  it('picks multiple nested properties', () => {
    /**
     * @type {{name?: {first: string, last: string}, age?: number, occupation?: string}}
     */
    const person = {}
    setTimeout(() => {
      person.name = { first: 'Joe', last: 'Smith' }
      person.occupation = 'student'
      person.age = 21
    }, 1000)
    cy.wrap(person, { timeout: 1100 })
      // should pick the property "age"
      // and should pick the nested property "name.first"
      // and store it under the name "first"
      .map(['name.first', 'age'])
      .should('deep.equal', {
        first: 'Joe',
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

  it('maps paths over an array subject', () => {
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
      .map(['name.first', 'name.last'])
      .should('deep.equal', [
        { first: 'Joe', last: 'Smith' },
        { first: 'Anna', last: 'Kova' },
      ])
  })

  it('maps combo paths over an array subject', () => {
    const people = [
      {
        name: {
          first: 'Joe',
          last: 'Smith',
        },
        age: 21,
      },
      {
        name: {
          first: 'Anna',
          last: 'Kova',
        },
        age: 22,
      },
    ]
    cy.wrap(people)
      // some paths are nested, some are not
      .map(['name.first', 'age'])
      .should('deep.equal', [
        { first: 'Joe', age: 21 },
        { first: 'Anna', age: 22 },
      ])
  })
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

describe('map index', () => {
  // subject is an array of arrays
  const subject = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
  ]

  it('maps index 0 as a string property name', () => {
    cy.wrap(subject).map('0').should('deep.equal', ['a', 'd', 'g'])
  })

  it('maps index 1 as an integer', () => {
    cy.wrap(subject).map(1).should('deep.equal', ['b', 'e', 'h'])
  })

  it('uses it in the chain', () => {
    cy.wrap(['hello', 'goodbye'])
      .mapInvoke('split', '')
      .map(4)
      .should('deep.equal', ['o', 'b'])
  })
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
