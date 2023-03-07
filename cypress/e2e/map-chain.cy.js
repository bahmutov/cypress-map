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

it('maps each item to the cy yielded value', () => {
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
