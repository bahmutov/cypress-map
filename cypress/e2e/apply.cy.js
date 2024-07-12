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

describe('applyToFirst', () => {
  it('applies the given callback to the first item', () => {
    cy.wrap([100, 200]).applyToFirst(double).should('equal', 200)
  })

  it('applies with arguments (subject is last)', () => {
    cy.wrap([100]).applyToFirst(div, 1000).should('equal', 10)
    cy.wrap([2]).applyToFirst(Cypress._.add, 4).should('equal', 6)
    cy.wrap([8])
      .applyToFirst(Cypress._.subtract, 4)
      .should('equal', -4)
  })

  it('applies to the first element', () => {
    cy.wrap(Cypress.$('<div>100</div><div>200</div>'))
      .applyToFirst((base, el) => parseInt(el.innerText, base), 10)
      .should('equal', 100)
  })
})

describe('applyToFirstRight', () => {
  it('applies the given callback to the subject', () => {
    cy.wrap([100]).applyToFirstRight(double).should('equal', 200)
  })

  it('applies with arguments (subject is first)', () => {
    cy.wrap([100]).applyToFirstRight(div, 1000).should('equal', 0.1)
    cy.wrap([8])
      .applyToFirstRight(Cypress._.subtract, 4)
      .should('equal', 4)
    // same as
    cy.wrap([8])
      .applyToFirst((subject) => Cypress._.subtract(subject, 4))
      .should('equal', 4)
  })

  it('applies to the first element', () => {
    cy.wrap(Cypress.$('<div>100</div><div>200</div>'))
      .applyToFirstRight(
        (el, base) => parseInt(el.innerText, base),
        10,
      )
      .should('equal', 100)
  })
})
