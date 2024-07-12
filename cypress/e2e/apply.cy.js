/// <reference types="cypress" />
// @ts-check

import '../../src/commands'

const double = (n) => n * 2
const div = (a, b) => a / b

describe('apply', () => {
  it('applies the given callback to the subject', () => {
    cy.wrap(100).apply(double).should('equal', 200)
  })

  it('applies with arguments (subject is last)', () => {
    cy.wrap(100).apply(div, 1000).should('equal', 10)
    cy.wrap(2).apply(Cypress._.add, 4).should('equal', 6)
    cy.wrap(8).apply(Cypress._.subtract, 4).should('equal', -4)
  })
})

describe('applyRight', () => {
  it('applies the given callback to the subject', () => {
    cy.wrap(100).applyRight(double).should('equal', 200)
  })

  it('applies with arguments (subject is first)', () => {
    cy.wrap(100).applyRight(div, 1000).should('equal', 0.1)
    cy.wrap(8).applyRight(Cypress._.subtract, 4).should('equal', 4)
    // same as
    cy.wrap(8)
      .apply((subject) => Cypress._.subtract(subject, 4))
      .should('equal', 4)
  })
})
