/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

// import cypress-map plugin
import '../../commands'

describe('detach', () => {
  beforeEach(() => {
    cy.visit('cypress/detach.html')
  })

  it('removes the element from the DOM', () => {
    cy.contains('#name', 'Santo').should(
      'satisfy',
      Cypress.dom.isDetached,
    )
  })

  it('removes after click', () => {
    // grab the initial element to prepare
    cy.get('#name').then(($el) => {
      cy.contains('Click to remove Joe').click()
      // confirm the old element is gone
      cy.wrap(null).should(() => {
        expect($el[0], 'element is gone').to.satisfy(
          Cypress.dom.isDetached,
        )
      })
      // the new element should be quickly there
      cy.contains('#name', 'Anna', { timeout: 0 })
    })
  })

  it('removes after click (query)', () => {
    cy.contains('Click to remove Joe').click()
    cy.detaches('#name2')
    // confirm the old element is gone
    // the new element should be quickly there
    cy.contains('#name2', 'Anna', { timeout: 0 })
  })
})
