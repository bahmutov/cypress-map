/// <reference types="cypress" />
// @ts-check

// import cypress-map plugin
import '../../commands'

describe('table', { viewportWidth: 400, viewportHeight: 400 }, () => {
  it('checks the column of cells', () => {
    cy.visit('cypress/table.html')
    cy.get('table#people tbody td:nth-child(2)')
      .should('have.length', 4)
      .map('innerText')
      .map(Number)
      .should('deep.equal', [20, 30, 28, 22])
  })
})
