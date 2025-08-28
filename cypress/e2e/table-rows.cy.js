/// <reference types="cypress" />
// @ts-check

// https://github.com/bahmutov/cy-spok
// @ts-ignore
import spok from 'cy-spok'

// import cypress-map plugin
import '../../commands'

describe(
  'table rows',
  {
    viewportWidth: 300,
    viewportHeight: 200,
    defaultCommandTimeout: 100,
  },
  () => {
    beforeEach(() => {
      cy.visit('cypress/table.html')
      // confirm the table headings
      const headings = ['Name', 'Age', 'Date (YYYY-MM-DD)']
      cy.get('table thead td')
        .map('innerText')
        .should('deep.equal', headings)
    })

    it('confirms the first row (text)', () => {
      cy.get('table tbody tr')
        .first()
        .find('td')
        // warning: no retries
        .then((td$) => {
          return {
            name: td$[0].innerText,
            age: td$[1].innerText,
            date: td$[2].innerText,
          }
        })
        .print()
        .should('deep.equal', {
          name: 'Dave',
          age: '20',
          date: '2023-12-23',
        })
    })

    it('confirms the first row (spread)', () => {
      cy.get('table tbody tr')
        .first()
        .find('td')
        // warning: spread is NOT a query, so it won't retry
        .spread((name, age, date) => {
          return {
            name: name.innerText,
            age: age.innerText,
            date: date.innerText,
          }
        })
        .print()
        .should('deep.equal', {
          name: 'Dave',
          age: '20',
          date: '2023-12-23',
        })
    })

    const props = ['name', 'age', 'date']
    it('confirms the first row', () => {
      cy.get('table tbody tr')
        .first()
        .find('td')
        .map('innerText')
        .print()
        .apply((values) => Cypress._.zipObject(props, values))
        .print()
        .should('deep.equal', {
          name: 'Dave',
          age: '20',
          date: '2023-12-23',
        })
    })

    it('confirms the first row (convert values)', () => {
      cy.get('table tbody tr')
        .first()
        .find('td')
        .map('innerText')
        .print()
        .apply((values) => Cypress._.zipObject(props, values))
        .apply((person) => {
          person.age = Number(person.age)
          return person
        })
        .print()
        .should('deep.include', {
          name: 'Dave',
          age: 20,
        })
    })

    it('confirms the first row (convert values using update)', () => {
      cy.get('table tbody tr')
        .first()
        .find('td')
        .map('innerText')
        .print()
        .apply((values) => Cypress._.zipObject(props, values))
        .update('age', Number)
        .print()
        .should('deep.include', {
          name: 'Dave',
          age: 20,
        })
    })

    it('confirms the first row with update and cy-spok', () => {
      cy.get('table tbody tr')
        .first()
        .find('td')
        .map('innerText')
        .print()
        .apply((values) => Cypress._.zipObject(props, values))
        .update('age', Number)
        .print()
        .should(
          spok({
            name: 'Dave',
            age: spok.range(1, 99),
            date: spok.test(/^\d\d\d\d-\d\d-\d\d$/),
          }),
        )
    })

    it('confirms the first row with partial, update, and cy-spok', () => {
      cy.get('table tbody tr')
        .first()
        .find('td')
        .map('innerText')
        .print()
        .partial(Cypress._.zipObject, props)
        .update('age', Number)
        .print()
        .should(
          spok({
            name: 'Dave',
            age: spok.range(1, 99),
            date: spok.test(/^\d\d\d\d-\d\d-\d\d$/),
          }),
        )
    })

    it('confirms the row with Anna', () => {
      cy.contains('table tbody tr', 'Anna')
        .find('td')
        .map('innerText')
        .print()
        .partial(Cypress._.zipObject, props)
        .update('age', Number)
        .print()
        .should(
          spok({
            name: 'Anna',
            age: spok.range(10, 30),
            date: spok.test(/^\d\d\d\d-\d\d-\d\d$/),
          }),
        )
    })
  },
)
