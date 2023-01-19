/// <reference types="cypress" />
// @ts-check

// import cypress-map plugin
import '../../commands'

describe('table', { viewportWidth: 300, viewportHeight: 200 }, () => {
  beforeEach(() => {
    cy.visit('cypress/table.html')
  })

  it('checks the column of cells', () => {
    cy.contains('table#people thead td:nth-child(2)', 'Age')
    cy.get('table#people tbody td:nth-child(2)')
      .should('have.length', 4)
      .map('innerText')
      .map(Number)
      .should('deep.equal', [20, 30, 28, 22])
  })

  it('gets the entire table', () => {
    cy.get('table')
      .table()
      .should('deep.equal', [
        ['Name', 'Age', 'Date (YYYY-MM-DD)'],
        ['Dave', '20', '2023-12-23'],
        ['Cary', '30', '2024-01-24'],
        ['Joe', '28', '2022-02-25'],
        ['Anna', '22', '2027-03-26'],
      ])
  })

  it('gets the headings', () => {
    cy.get('table')
      .table(0, 0, 3, 1)
      .its(0)
      .print()
      .should('deep.equal', ['Name', 'Age', 'Date (YYYY-MM-DD)'])
  })

  it('gets the headings row', () => {
    cy.get('table')
      .table(0, 0)
      .its(0)
      .print()
      .should('deep.equal', ['Name', 'Age', 'Date (YYYY-MM-DD)'])
  })

  it('gets the first column', () => {
    cy.get('table')
      .table(0, 0, 1, 5)
      .print()
      .should('deep.equal', [['Name'], ['Dave'], ['Cary'], ['Joe'], ['Anna']])
  })

  it('gets the entire first column', () => {
    cy.get('table')
      .table(0, 0, 1)
      .print()
      .should('deep.equal', [['Name'], ['Dave'], ['Cary'], ['Joe'], ['Anna']])
  })

  it('gets a region of the table', () => {
    cy.get('table')
      .table(0, 2, 2, 2)
      .print()
      .should('deep.equal', [
        ['Cary', '30'],
        ['Joe', '28'],
      ])
  })

  it('gets a region of the table using slice', () => {
    cy.get('table')
      .table()
      .invoke('slice', 2, 4)
      .mapInvoke('slice', 0, 2)
      .print()
      .should('deep.equal', [
        ['Cary', '30'],
        ['Joe', '28'],
      ])
  })
})
