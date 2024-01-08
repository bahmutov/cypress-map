/// <reference types="cypress" />
// @ts-check
import '../../../src/commands'

// implementation similar to "Json data attribute" recipe
// from https://glebbahmutov.com/cypress-examples

it('compares the parsed data attribute object', () => {
  cy.visit('cypress/e2e/json-attribute/index.html')
  // grab the element's attribute "data-field"
  // convert it into a JSON object
  // and grab its "age" property -> should be equal 10
  cy.get('#person')
    .invoke('attr', 'data-field')
    .apply(JSON.parse)
    .its('age')
    .should('equal', 10)
})
