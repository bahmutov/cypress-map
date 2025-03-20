/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

import '../../commands'

describe('unique', () => {
  it('checks array elements are unique', () => {
    cy.wrap([1, 2, 3])
      .should('be.unique')
      .and('have.length', 3)
      .its(1)
      .should('equal', 2)
    cy.wrap([1, 2, 2])
      .should('not.be.unique')
      .and('have.length', 3)
      .its(1)
      .should('equal', 2)
  })
})
