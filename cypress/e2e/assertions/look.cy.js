/// <reference types="cypress" />
// @ts-check

import '../../../src/commands'

describe('should look', () => {
  it('checks one element without children or text', () => {
    cy.visit('cypress/index.html')
    cy.get('#items')
      .should('look', '<ul id="items" />')
      .and('not.look', '<ul id="itemz" />')
  })

  it('checks children elements', () => {
    cy.visit('cypress/index.html')
    cy.get('#items')
      .should('look', '<ul id="items"><li>second</li></ul>')
      .and('not.look', '<ul id="items"><li>DOES NOT EXIST</li></ul>')
  })

  it('retries', () => {
    cy.visit('cypress/index.html')
    cy.get('#items')
      // the fifth element appears after a delay
      .should('look', '<ul id="items"><li>fifth</li></ul>')
  })

  it('checks the attribute with retries', () => {
    cy.visit('cypress/index.html')
    // the item appears after a delay
    cy.get('#items')
      .should(
        'look',
        '<ul id="items"><li aria-label="four">fourth</li></ul>',
      )
      // without text too
      .and('look', '<ul id="items"><li aria-label="four" /></ul>')
  })

  it('yields the original element', () => {
    cy.visit('cypress/index.html')
    cy.get('#items')
      .should('look', '<ul id="items" />')
      .should('match', 'ul#items')
      .invoke('html')
      .invoke('trim')
      .invoke('split', '\n')
      .mapInvoke('trim')
      .then((html) => {
        console.log(html)
        expect(html, 'exact html').to.deep.equal([
          '<li class="matching">first</li>',
          '<li>second</li>',
          '<li class="matching">third</li>',
        ])
      })
  })

  // TODO: confirm we are checking the elements in order
  it.skip('checks attributes', () => {
    cy.visit('cypress/index.html')
    cy.get('#items').should(
      'look',
      '<ul id="items"><li class="matching" /><li class="matching" /><li class="matching" /></ul>',
    )
  })
})
