/// <reference types="cypress" />

const { registerCommand } = require('./utils')

function never(selector, options) {
  if (typeof selector !== 'string') {
    throw new Error('Missing the element selector')
  }
  // maximum timeout while checking the DOM
  const timeout =
    options?.timeout ??
    Cypress.config('defaultCommandTimeout') ??
    2_000
  const stopSelector = options?.stopSelector

  const log = Cypress.log({
    name: 'never',
    message: `"${selector}"`,
  })

  cy.document({ log: false }).then((doc) => {
    const started = Date.now()
    // check the DOM every N milliseconds
    const delay = 50

    cy.log(
      `checking if ${selector} appears within ${timeout}ms`,
    ).then(async () => {
      const $doc = Cypress.$(doc)
      while (Date.now() - started < timeout - delay) {
        const gameHistoryTable = $doc.find(selector)
        if (gameHistoryTable.length > 0) {
          throw new Error(`Element "${selector}" was found`)
        }

        if (stopSelector) {
          const finished = $doc.find(stopSelector)
          if (finished.length > 0) {
            // all done
            cy.log(`stopping check, found ${stopSelector}`)
            break
          }
        }
        await Cypress.Promise.delay(delay)
      }
    })
  })
}

registerCommand('never', never)
