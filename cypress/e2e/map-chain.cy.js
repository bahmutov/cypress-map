/// <reference types="cypress" />
// @ts-check
import '../../commands'

const doubleIt = (n) => n + n

async function asyncDouble(n) {
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
    .mapChain((x) => cy.wrap(x).then(doubleIt))
    .should('deep.equal', [2, 4, 6])
})

it('maps each item using a Promise', () => {
  cy.wrap([1, 2, 3])
    .mapChain((x) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(doubleIt(x))
        }, 500)
      })
    })
    .should('deep.equal', [2, 4, 6])
})

// https://github.com/bahmutov/cypress-map/issues/27
it('maps each item to the cy yielded value without returned chain', () => {
  cy.wrap([1, 2, 3])
    .mapChain((x) => {
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
