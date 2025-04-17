/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

import '../../commands'

chai.config.truncateThreshold = 300

describe('elements', () => {
  it('loads the list of elements', () => {
    cy.visit('cypress/list.html')
    cy.elements('#tasks li', '.name', '.k').should('deep.equal', [
      ['Item A', '1'],
      ['Item B', '2'],
      ['Item C', '3'],
      ['Item D', '4'],
    ])
  })

  it('loads the list of elements with order', () => {
    cy.visit('cypress/list.html')
    cy.elements('#tasks li', '.k', '.name').should('deep.equal', [
      ['1', 'Item A'],
      ['2', 'Item B'],
      ['3', 'Item C'],
      ['4', 'Item D'],
    ])
  })
})
