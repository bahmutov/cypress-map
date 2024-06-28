/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

import '../../commands'

it('picks a random item from the list', () => {
  const list = ['foo', 'bar', 'baz']
  cy.wrap(list).sample().should('be.oneOf', list)
})

it('picks a random element', () => {
  cy.visit('cypress/index.html')
  // the first item is immediately in the list
  cy.get('#items li').sample().should('have.text', 'first')
  cy.log('**retries until the item appears and is picked**')
  cy.get('#items li').sample().should('have.text', 'fifth')
})

it('picks N random items', () => {
  const list = ['foo', 'bar', 'baz']
  cy.wrap(list).sample(2).should('have.length', 2)
})

it('picks N random elements', () => {
  cy.visit('cypress/index.html')
  // the first item is immediately in the list
  cy.get('#items li').sample().should('have.text', 'first')
  cy.log('**retries until all items appear**')
  cy.get('#items li')
    .sample(5)
    .should('have.length', 5)
    .and('satisfy', Cypress.dom.isJquery)
    .map('innerText')
    .invoke('sort')
    .should('deep.equal', [
      'fifth',
      'first',
      'fourth',
      'second',
      'third',
    ])
  cy.log('**elements are random**')
  cy.get('#items li').sample(2).map('innerText').print()
})

it('stores value in a static alias', () => {
  cy.wrap('foo')
    .as('word', { type: 'static' })
    .then(console.log)
    .should('equal', 'foo')
  cy.get('@word').then(console.log).should('equal', 'foo')
})

// TODO: make sure the value of sample is evaluated just once
// and saved as a static alias
it('stores sample in the static alias', () => {
  let value
  cy.wrap(['foo', 'bar', 'baz', 'quux', 'quuz'])
    .sample()
    .then(console.log)
    .as('word', { type: 'static' })
    .should('be.a', 'string')
    .then((w) => (value = w))

  // TODO: value should be the same as the first sample
  cy.get('@word').should((word) => {
    expect(word, 'static aliased value').to.equal(value)
  })
})
