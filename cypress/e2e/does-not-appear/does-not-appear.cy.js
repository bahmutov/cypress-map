/// <reference types="cypress" />
// @ts-check

import '../../../src/commands'

it('checks if the error message appears at all', () => {
  cy.visit('cypress/e2e/does-not-appear/index.html')

  cy.contains('#message', 'Loading...')
  // confirm the ".error" element NEVER shows up during 2 seconds
  // if we find the element "#message" with text "Finished" we stop checking
  cy.never('.error', {
    timeout: 3_000,
    stopSelector: '#message:contains("Finished")',
  })

  cy.contains('#message', 'Finished')
})
