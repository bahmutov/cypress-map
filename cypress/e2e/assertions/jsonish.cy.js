/// <reference types="cypress" />
// @ts-check

import '../../../src/commands'

// @ts-ignore
Cypress.Commands.add('getReporter', () => {
  const reporterIframe =
    window.top?.document.getElementById('reporter-frame')
  // @ts-ignore
  const reporterDocument = reporterIframe?.contentDocument
  const reporter = reporterDocument.getElementById('unified-reporter')
  return cy.wrap(reporter)
})

Cypress.Commands.add(
  // @ts-ignore
  'checkLogged',
  /**
   * Confirms that Cypress ASSERT log has the given message
   * @param {string} message - The message to find
   */
  (message) => {
    // @ts-ignore
    cy.getReporter().contains(
      '.runnable-active .command-name-assert .command-message-text',
      message,
      // short timeout - the message should be already there
      // or quickly logged and rendered
      { timeout: 2_000 },
    )
  },
)

it('checks if a string is JSONish', () => {
  cy.wrap('{"key": "value"}').should('be.jsonish')
  cy.wrap('{}').should('be.jsonish')
  cy.wrap('[]').should('be.jsonish')
  cy.wrap('{"nested": {"key": "value"}}').should('be.jsonish')
  cy.wrap('{"array": [1, 2, 3]}').should('be.jsonish')
  cy.wrap('{"boolean": true}').should('be.jsonish')
  cy.wrap('{"null": null}').should('be.jsonish')
  cy.wrap('{"number": 123}').should('be.jsonish')

  // uncomment to see the failing assertion
  // cy.wrap('{"number": 123}').should('not.be.jsonish')
})

it('checks if a string is NOT JSONish', () => {
  cy.wrap('{"foo').should('not.be.jsonish')
})

it('rejects primitives', () => {
  cy.wrap('null').should('not.be.jsonish')
  cy.wrap('true').should('not.be.jsonish')
  cy.wrap('false').should('not.be.jsonish')
  cy.wrap('hello').should('not.be.jsonish')
})

it('writes weird error message for primitive values', () => {
  cy.wrap('null').should('not.be.jsonish')

  // @ts-ignore
  cy.checkLogged('with "{" or "["not start')
})

it('uses double quotes in the message without them', () => {
  cy.wrap('   {}   ').should('be.jsonish')

  // @ts-ignore
  cy.checkLogged('expected "{}" to be a JSON string')

  cy.wrap('   [1]   ').should('be.jsonish')
  // @ts-ignore
  cy.checkLogged('expected "[1]" to be a JSON string')
})

it('trims spaces in the message', () => {
  cy.wrap('   {"key": "value1234"}   ').should('be.jsonish')

  // @ts-ignore
  cy.checkLogged('expected {"key": "value1234"} to be a JSON string')
})

it('trims long JSONish strings', () => {
  cy.wrap(
    '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]',
  ).should('be.jsonish')

  // @ts-ignore
  cy.checkLogged(
    'expected "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ..." to be a JSON string',
  )
})
