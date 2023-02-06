/// <reference types="cypress" />

import '../../commands'

const { _ } = Cypress

const onBeforeLog = (log, command, commandLogId) => {
  // console.log('onBeforeLog', { log, command, commandLogId })
  log.set('commandLogId', commandLogId)

  const previousLogInstance = command
    .get('logs')
    .find(
      Cypress._.matchesProperty(
        'attributes.commandLogId',
        commandLogId,
      ),
    )

  if (previousLogInstance) {
    // log.merge unsets any keys that aren't set on the new log instance. We
    // copy over 'snapshots' beforehand so that existing snapshots aren't lost
    // in the merge operation.
    log.set('snapshots', previousLogInstance.get('snapshots'))
    previousLogInstance.merge(log)

    if (previousLogInstance.get('end')) {
      previousLogInstance.end()
    }

    // Returning false prevents this new log from being added to the command log
    return false
  }

  return true
}

Cypress.Commands.addQuery('every', (chainers, ...args) => {
  const lastChainer = Cypress._.last(chainers.split('.'))

  return (subject) => {
    Cypress._.forEach(subject, (el) => {
      const subjectChainers = chainers.split('.')

      const applyChainer = function (memo, value) {
        if (value === lastChainer) {
          if (typeof memo[value] === 'function') {
            return memo[value](...args)
          } else {
            return memo[value]
          }
        }
        return memo[value]
      }

      const newExp = _.reduce(
        subjectChainers,
        (memo, value) => {
          return applyChainer(memo, value)
        },
        cy.expect(el).to,
      )
    })
    return subject
  }
})

it('checks visibility for any of the elements and moves on', () => {
  cy.visit('cypress/every.html')
  cy.get('#fruits li').should('be.visible')
})

it('retries the given assertion for every element', () => {
  // TODO: figure out how to replace the log messages
  // rather than keep adding new entries
  cy.visit('cypress/every.html')
  cy.get('#fruits li').every('be.visible')
})
