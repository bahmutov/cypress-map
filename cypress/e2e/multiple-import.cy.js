/// <reference types="cypress" />
// @ts-check

import '../../commands'

it('works after multiple imports', () => {
  cy.wrap(['one', 'two']).map('length').should('deep.equal', [3, 3])
})
