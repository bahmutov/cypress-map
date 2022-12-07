/// <reference types="cypress" />

const getTexts = ($el) => {
  return Cypress._.map($el, 'innerText')
}

it('confirms the list', () => {
  cy.visit('cypress/index.html')
  cy.get('.matching')
    .then(getTexts)
    .should('deep.equal', ['first', 'third', 'fourth'])
})
