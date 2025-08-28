/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

import '../../commands'
// https://github.com/bahmutov/cy-spok
// @ts-ignore
import spok from 'cy-spok'

describe('to plain object', () => {
  beforeEach(() => {
    cy.visit('cypress/dataset.html')
  })

  it('applies JSON stringify and parse', () => {
    cy.get('article')
      .should('have.attr', 'data-columns', '3')
      .invoke('prop', 'dataset')
      // convert from DOMStringMap to a plain object
      .apply(JSON.stringify)
      .apply(JSON.parse)
      .should('deep.equal', {
        columns: '3',
        indexNumber: '12314',
        parent: 'cars',
      })
  })

  it('uses cy-spok with DOMStringMap', () => {
    cy.get('article')
      .should('have.attr', 'data-columns', '3')
      .invoke('prop', 'dataset')
      .should(
        spok({
          columns: '3',
          indexNumber: '12314',
          parent: 'cars',
        }),
      )
  })

  it('uses cy.toPlainObject custom query', () => {
    cy.get('article')
      .should('have.prop', 'dataset')
      .toPlainObject()
      .should('deep.equal', {
        columns: '3',
        indexNumber: '12314',
        parent: 'cars',
      })
  })
})

it('uses entries to convert', () => {
  const searchParams =
    '?callback=%2Fmy-profile-page.html&question=what%20is%20the%20meaning%20of%20life%3F&answer=42'
  cy.wrap(new URLSearchParams(searchParams))
    .toPlainObject('entries')
    .should('deep.equal', {
      callback: '/my-profile-page.html',
      question: 'what is the meaning of life?',
      answer: '42',
    })
})
