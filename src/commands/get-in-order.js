/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('getInOrder', (...selectors) => {
  // if you pass a single array of selectors, use it as the selectors
  if (
    Array.isArray(selectors) &&
    selectors.length === 1 &&
    Array.isArray(selectors[0])
  ) {
    selectors = selectors[0]
  }

  if (!Array.isArray(selectors)) {
    throw new Error(`Invalid cy.getInOrder selectors ${selectors}`)
  }
  const log = Cypress.log({
    name: 'getInOrder',
    message: selectors.join(','),
  })

  return () => {
    let subject = Cypress.$(selectors[0])
    if (subject.length === 0) {
      throw new Error(`No elements found for ${selectors[0]}`)
    }

    selectors.slice(1).forEach((selector) => {
      const next = Cypress.$(selector)
      if (next.length === 0) {
        throw new Error(`No elements found for ${selector}`)
      }
      // avoid sorting elements by passing the elements as a single array
      subject = Cypress.$(subject.toArray().concat(next.toArray()))
    })

    return subject
  }
})
