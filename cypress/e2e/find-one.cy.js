/// <reference types="cypress" />
// @ts-check

// import cypress-map plugin
import '../../commands'

describe('findOne', () => {
  it('yields the element using callback fn', () => {
    const values = []
    setTimeout(() => {
      values.push(1)
      values.push(2)
      values.push(3)
    }, 1000)
    cy.wrap(values)
      .findOne((n) => n === 3)
      .should('equal', 3)
  })

  it('shows the callback function name if any', () => {
    const values = [1, 2]
    setTimeout(() => {
      values.push(3)
    }, 1000)
    cy.wrap(values)
      .findOne(function is3(n) {
        return n === 3
      })
      .should('equal', 3)
  })

  it('shows the callback arrow function name if any', () => {
    const values = [1, 2]
    const equals3 = (n) => n === 3
    setTimeout(() => {
      values.push(3)
    }, 1000)
    cy.wrap(values).findOne(equals3).should('equal', 3)
  })

  it('finds using property', () => {
    const values = [{ name: 'Joe' }]
    setTimeout(() => {
      values.push({ name: 'Anna' })
    }, 1000)
    cy.wrap(values).findOne({ name: 'Anna' }).should('exist')
  })
})
