/// <reference types="cypress" />
// @ts-check

import '../../../src/commands'

it('compares text', () => {
  cy.visit('cypress/index.html')
  cy.get('li').first().should('read', 'first')
  cy.get('li').should('read', ['first', 'second', 'third'])
  // passes after delay
  cy.get('li').should('read', [
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
  ])
})

it('supports a single regular expression', () => {
  cy.visit('cypress/index.html')
  cy.get('li').first().should('read', /FIRST/i)
})

it('supports a mixture of strings and regular expressions', () => {
  cy.visit('cypress/index.html')
  cy.get('li').should('read', ['first', /^sec/, 'third'])
})

it(
  'fails when the number of elements does not match',
  { defaultCommandTimeout: 2000 },
  () => {
    cy.on('fail', (err) => {
      console.log(err.message)
      const validFailureMessage =
        'Timed out retrying after 2000ms: expected first, second, third, fourth, fifth to read first, second'
      if (err.message !== validFailureMessage) {
        throw err
      }
    })

    cy.visit('cypress/index.html')
    // try using the wrong number of elements
    cy.get('li').should('read', ['first', 'second'])
  },
)
