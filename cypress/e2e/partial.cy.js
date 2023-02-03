/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('applies the partially applied callback', () => {
  cy.wrap(100).partial(Cypress._.add, 5).should('equal', 105)
})
