/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

import '../../commands'

describe('mapMake', () => {
  it('uses a constructor in a query step', () => {
    const dates = ['Jan 1, 2019', 'Feb 2, 2020', 'Mar 3, 2021']
    cy.wrap(dates)
      .mapMake(Date)
      .print()
      .mapInvoke('getFullYear')
      .should('deep.equal', [2019, 2020, 2021])
  })
})
