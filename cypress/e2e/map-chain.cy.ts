/// <reference path="../../src/commands/index.d.ts" />
// @ts-check
import '../../commands'

// do not truncate deep objects in error messages
chai.config.truncateThreshold = 0

const doubleIt = (n: number) => n + n

async function asyncDouble(n: number) {
  await Cypress.Promise.delay(500)
  return n + n
}

it('maps each item using sync function', () => {
  cy.wrap([1, 2, 3])
    .mapChain(doubleIt)
    .should('deep.equal', [2, 4, 6])
})

it('maps each item using async function', () => {
  cy.wrap([1, 2, 3])
    .mapChain(asyncDouble)
    .should('deep.equal', [2, 4, 6])
})

it('maps each item to the cy yielded value of the returned chain', () => {
  cy.wrap([1, 2, 3])
    .mapChain((x: number) => cy.wrap(x).then(doubleIt))
    .should('deep.equal', [2, 4, 6])
})

it('maps each item using a Promise', () => {
  cy.wrap([1, 2, 3])
    .mapChain((x: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(doubleIt(x))
        }, 500)
      })
    })
    .should('deep.equal', [2, 4, 6])
})

it('yields an array that we can invoke methods on', () => {
  cy.wrap([1, 2, 3])
    .mapChain(String)
    .invoke('join', ',')
    .should('deep.equal', '1,2,3')
})

// https://github.com/bahmutov/cypress-map/issues/27
it('maps each item to the cy yielded value without returned chain', () => {
  cy.wrap([1, 2, 3])
    .mapChain((x: number) => {
      // do not return the command chain
      // but it still should grab the resolved value
      cy.wrap(x).then(doubleIt)
    })
    .should('deep.equal', [2, 4, 6])
})

it('works for an empty array', () => {
  cy.wrap([])
    .mapChain(() => {
      throw new Error('Should not call mapChain callback')
    })
    .should('deep.equal', [])
})

it('works for a filtered empty array', () => {
  cy.wrap([1, 2, 3])
    .invoke('filter', () => false)
    .mapChain(() => {
      throw new Error('Should not call mapChain callback')
    })
    .should('deep.equal', [])
})

// TODO: https://github.com/bahmutov/cypress-map/issues/294
it.skip('performs Cy commands on each element', () => {
  cy.visit('cypress/index.html')
  // there are 5 list items eventually
  cy.get('li').should('have.length', 5)
  // not every item has the "matching" class
  cy.get('li')
    .filter(':not(.matching)')
    // add "matching" class to each non-matching item
    .mapChain((el: Element) => {
      cy.wrap(el).click().invoke('addClass', 'matching')
    })
})

it('collects results of cy commands', () => {
  cy.visit('cypress/e2e/usernames/index.html')

  const usernames = [
    'u1',
    'very-long-username-12345',
    'admin',
    'root',
    'superuser',
  ]
  cy.wrap(usernames, { log: false })
    // check each username and yield the error message text
    .mapChain((username: string) => {
      cy.get('input#username').clear().type(username)
      return cy.get('#result').should('be.visible').invoke('text')
    })
    .should('deep.equal', [
      'Username is too short',
      'Username is too long',
      'Username is reserved',
      'Username is reserved',
      'Username is reserved',
    ])
})
