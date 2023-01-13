/// <reference types="cypress" />
// @ts-check

import '../../commands'

chai.config.truncateThreshold = 200

describe('cy.print', () => {
  it('prints the user age', () => {
    cy.visit('cypress/log-examples.html')
    cy.contains('#age', /\d+/)
      .invoke('text')
      .print('my age is %d')
      .then(Number)
      // what's my age again?
      .should('be.within', 1, 99)
  })

  it('prints the object', () => {
    cy.intercept('/users', {
      body: [
        { name: 'Joe', age: 1, role: 'student' },
        { name: 'Ann', age: 2, role: 'student' },
        { name: 'Mary', age: 3, role: 'student' },
      ],
    }).as('users')
    cy.visit('cypress/log-examples.html')
    cy.wait('@users').its('response.body').print().should('be.an', 'array')
  })

  it('prints the length and the first object', () => {
    cy.intercept('/users', {
      body: [
        { name: 'Joe', age: 1, role: 'student' },
        { name: 'Ann', age: 2, role: 'student' },
        { name: 'Mary', age: 3, role: 'student' },
      ],
    }).as('users')
    cy.visit('cypress/log-examples.html')
    cy.wait('@users')
      .its('response.body')
      .print('list with {0.length} users')
      .print('first user {0.0.name}')
      .should('be.an', 'array')
  })

  it('retries', () => {
    const person = {
      name: 'Joe',
    }
    cy.wrap(person)
      .print('first name is {0.name}')
      .its('name')
      .should('equal', 'Ann')
    setTimeout(() => {
      person.name = 'Ann'
    }, 1000)
  })
})

describe.skip('cy.log', () => {
  it('logs the user age (NOT)', () => {
    cy.visit('cypress/log-examples.html')
    cy.contains('#age', /\d+/)
      .invoke('text')
      .then(console.log)
      .then(Number)
      // what's my age again?
      .should('be.within', 1, 99)
  })

  it('retries (NOT)', () => {
    const person = {}
    cy.wrap(person)
      // @ts-ignore
      .log()
      .its('name')
      .should('equal', 'Ann')
    setTimeout(() => {
      person.name = 'Ann'
    }, 1000)
  })

  it('logs the object (NOT)', () => {
    cy.intercept('/users', {
      body: [
        { name: 'Joe', age: 1, role: 'student' },
        { name: 'Ann', age: 2, role: 'student' },
        { name: 'Mary', age: 3, role: 'student' },
      ],
    }).as('users')
    cy.visit('cypress/log-examples.html')
    cy.wait('@users').its('response.body').should('be.an', 'array')
  })
})
