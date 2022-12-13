/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('yields the object property using cy.its', () => {
  const o = {}
  cy.wrap(o).its('name').should('equal', 'Joe')

  setTimeout(() => {
    o.name = 'Joe'
  }, 1000)
})

it('yields the object property using cy.prop', () => {
  const o = {}
  cy.wrap(o).prop('name').should('equal', 'Joe')

  setTimeout(() => {
    o.name = 'Joe'
  }, 1000)
})

it('yields the DOM prop', () => {
  cy.visit('cypress/index.html')
  // this does not work with cy.its
  cy.get('#items li.matching').last().prop('ariaLabel').should('equal', 'four')
})
