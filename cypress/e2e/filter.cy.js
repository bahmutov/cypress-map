/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

// import cypress-map plugin
import '../../commands'

chai.config.truncateThreshold = 500

// 📺 watch these examples explained
// in the video "Filter Elements And Items With Retries"
// https://youtu.be/70kRnoMuzds

describe('Filter examples', () => {
  it('filters array items', () => {
    const people = [
      {
        name: 'Joe',
      },
      {
        name: 'Mary',
      },
    ]
    // simulate a dynamic list by adding new records
    setTimeout(() => {
      people.push(
        {
          name: 'Ann',
        },
        {
          name: 'Kent',
        },
      )
    }, 1000)

    cy.wrap(people)
      // keep only the even items
      // the cy.invoke query command will be retried
      // https://on.cypress.io/invoke
      // Note: we cannot use cy.filter because the subject is not jQuery
      .invoke('filter', (x, k) => k % 2 === 0)
      .should('deep.equal', [
        {
          name: 'Joe',
        },
        {
          name: 'Ann',
        },
      ])
  })

  it(
    'filters elements in a jQuery object',
    { viewportHeight: 600, viewportWidth: 600 },
    () => {
      cy.intercept('/people', {
        fixture: 'people.json',
        delay: 1000,
      }).as('people')
      cy.visit('cypress/e2e/filter-table/index.html')
      cy.get('table tbody tr')
        // cy.filter query command is retried
        // https://on.cypress.io/filter
        .filter((k, el) => k % 2 === 0)
        .find('td:first') // query
        .map('innerText') // query
        .should('deep.equal', ['Peter', 'Mary'])
    },
  )
})
