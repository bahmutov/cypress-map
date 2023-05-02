/// <reference types="cypress" />
// @ts-check

// import cypress-map plugin
import '../../commands'

chai.config.truncateThreshold = 500

it(
  'controls the network data and uses cy.table',
  { viewportHeight: 600, viewportWidth: 600 },
  () => {
    cy.intercept('/people', {
      fixture: 'people.json',
      delay: 1000,
    }).as('people')
    cy.visit('cypress/e2e/filter-table/index.html')
    cy.get('#people tbody')
      // do not specify height
      .table(0, 0, 1)
      .apply(Cypress._.flatten)
      .should('deep.equal', ['Peter', 'Pete', 'Mary', 'Mary-Ann'])
    cy.get('input#by-name').type('Mary')
    cy.get('#people tbody')
      // do not specify height
      .table(0, 0, 1)
      .apply(Cypress._.flatten)
      .should('deep.equal', ['Mary', 'Mary-Ann'])
  },
)
