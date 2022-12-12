/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('applies the given callback to the subject', () => {
  const double = (n) => n * 2
  cy.wrap(100).apply(double).should('equal', 200)
})
