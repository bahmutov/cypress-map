/// <reference types="cypress" />
// @ts-check

//
import spok from 'cy-spok'

// import cypress-map plugin
import '../../commands'

describe('table rows', { viewportWidth: 300, viewportHeight: 200 }, () => {
  const headings = ['Name', 'Age', 'Date (YYYY-MM-DD)']

  beforeEach(() => {
    cy.visit('cypress/table.html')
    // confirm the table headings
    cy.get('table thead td').map('innerText').should('deep.equal', headings)
  })

  it('confirms the first row', () => {
    cy.get('table tbody tr')
      .first()
      .find('td')
      .map('innerText')
      .print()
      .apply((values) => Cypress._.zipObject(headings, values))
      .print()
      .should('deep.equal', {
        Name: 'Dave',
        Age: '20',
        'Date (YYYY-MM-DD)': '2023-12-23',
      })
  })

  it('confirms the first row (convert values)', () => {
    cy.get('table tbody tr')
      .first()
      .find('td')
      .map('innerText')
      .print()
      .apply((values) => Cypress._.zipObject(headings, values))
      .apply((person) => {
        person.Age = Number(person.Age)
        return person
      })
      .print()
      .should('deep.include', {
        Name: 'Dave',
        Age: 20,
      })
  })

  it('confirms the first row (convert values using update)', () => {
    cy.get('table tbody tr')
      .first()
      .find('td')
      .map('innerText')
      .print()
      .apply((values) => Cypress._.zipObject(headings, values))
      .update('Age', Number)
      .print()
      .should('deep.include', {
        Name: 'Dave',
        Age: 20,
      })
  })

  it('confirms the first row with update and cy-spok', () => {
    cy.get('table tbody tr')
      .first()
      .find('td')
      .map('innerText')
      .print()
      .apply((values) => Cypress._.zipObject(headings, values))
      .update('Age', Number)
      .print()
      .should(
        spok({
          Name: 'Dave',
          Age: spok.range(1, 99),
          'Date (YYYY-MM-DD)': spok.test(/^\d\d\d\d-\d\d-\d\d$/),
        }),
      )
  })

  it('confirms the first row with partial, update, and cy-spok', () => {
    cy.get('table tbody tr')
      .first()
      .find('td')
      .map('innerText')
      .print()
      .partial(Cypress._.zipObject, headings)
      .update('Age', Number)
      .print()
      .should(
        spok({
          Name: 'Dave',
          Age: spok.range(1, 99),
          'Date (YYYY-MM-DD)': spok.test(/^\d\d\d\d-\d\d-\d\d$/),
        }),
      )
  })
})
