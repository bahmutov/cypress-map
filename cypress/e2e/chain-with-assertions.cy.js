/// <reference types="cypress" />
// @ts-check

const double = (n) => n * 2

// @ts-ignore
Cypress.Commands.addQuery('apply', (fn) => (n) => fn(n))

// https://github.com/cypress-io/cypress/issues/25134
it.skip('fails to retry the cy.its', () => {
  const list = []
  cy.wrap(list)
    .its(0) // first item
    // this assertion breaks the query chain retries
    // it never "sees" the new number 5
    // because it never retries cy.its above
    .should('be.a', 'number')
    .apply(double)
    .should('equal', 10)

  setTimeout(() => {
    list[0] = 1
  }, 1000)

  setTimeout(() => {
    list[0] = 5
  }, 2000)
})

it('retries queries with assertions', () => {
  const list = []
  cy.wrap(list)
    // several queries (without assertion)
    .its(0) // first item
    .apply(double)
    .should('equal', 10)

  setTimeout(() => {
    list[0] = 1
  }, 1000)

  setTimeout(() => {
    list[0] = 5
  }, 2000)
})
