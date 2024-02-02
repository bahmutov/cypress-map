/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

import '../../commands'

it('uses a constructor in a query step', () => {
  cy.wrap('Jan 1, 2019')
    .make(Date)
    .invoke('getFullYear')
    .should('equal', 2019)
})

it('retries', () => {
  const list = []
  cy.wrap(list)
    .its(0)
    .make(Date)
    .invoke('getFullYear')
    .should('equal', 2019)
  setTimeout(() => {
    list[0] = 'Jan 1, 2019'
  }, 1000)
})
