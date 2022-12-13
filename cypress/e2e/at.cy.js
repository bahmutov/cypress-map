/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('cy.eq yields the jQuery object', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .eq(1)
    .should('satisfy', Cypress.dom.isJquery)
    .invoke('text')
    .should('equal', 'third')
  cy.get('.matching')
    .eq(2)
    .should('satisfy', Cypress.dom.isJquery)
    .and('have.length.above', 0)
    .invoke('text')
    .should('equal', 'fourth')
})

it('cy.at yields the DOM element', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .at(1)
    .should('satisfy', Cypress.dom.isElement)
    .its('innerText')
    .should('equal', 'third')
  cy.get('.matching')
    .at(2)
    .should('satisfy', Cypress.dom.isElement)
    .its('innerText')
    .should('equal', 'fourth')
})

it('cy.at yields the last DOM element for index -1', () => {
  cy.visit('cypress/index.html')
  cy.get('#items li').at(-1).its('innerText').should('equal', 'fifth')
})

it('cy.at yields an element in the array', () => {
  cy.wrap([1, 2, 3]).at(2).should('equal', 3)
})

it('cy.at the last element of the array for -1', () => {
  cy.wrap([1, 2, 3]).at(-1).should('equal', 3)
  cy.wrap([1, 2, 3]).at(-2).should('equal', 2)
})
