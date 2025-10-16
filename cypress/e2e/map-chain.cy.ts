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

it('performs Cy commands on each element', () => {
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

  cy.log('**all matching**')
  cy.get('li.matching').should('have.length', 5)
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
  const warnings = [
    'Username is too short',
    'Username is too long',
    'Username is reserved',
    'Username is reserved',
    'Username is reserved',
  ]
  cy.wrap(usernames, { log: false })
    // enter each username and yield the error message text
    .mapChain((username: string) => {
      cy.get('input#username').clear().type(username)
      return cy.get('#result').should('be.visible').invoke('text')
    })
    // confirm the warnings are as expected
    .should('deep.equal', warnings)
})

it('operates on each element', () => {
  cy.visit('cypress/e2e/lucky-guess/index.html')
  cy.contains('h1', 'Lucky guess').should('be.visible')
  // click on each button, collect the number shown
  // and confirm each number is between 0 and 10
  cy.get('button')
    .should('have.length.above', 3)
    .mapChain((btn: HTMLButtonElement) => {
      cy.wrap(btn, { log: false }).click()
      cy.get('#result')
        .should('be.visible')
        .invoke('text')
        .apply(Number)
        .should('be.within', 0, 10)
    })
    // we get all the yielded numbers in a single array
    .should('be.an', 'array')
    .and('have.length', 5)
    .each((n, k) => {
      expect(n, `number ${k + 1}`).to.be.within(0, 10)
    })
})

it('passes the index to the callback', () => {
  cy.wrap(['a', 'b', 'c'])
    .mapChain((x: string, i: number) => {
      expect(i, 'index is a number').to.be.a('number')
      expect(i, 'index').to.equal(['a', 'b', 'c'].indexOf(x))
      return `${i}:${x}`
    })
    .should('deep.equal', ['0:a', '1:b', '2:c'])
})
