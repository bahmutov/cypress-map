/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('detaches', (selector) => {
  const log = Cypress.log({
    name: 'detaches',
    message: String(selector),
  })

  let el = null
  return () => {
    if (!el) {
      const doc = cy.state('document')
      el = doc.querySelector(selector)
    }

    if (!Cypress.dom.isDetached(el)) {
      throw new Error(`Expected element to be detached`)
    }
  }
})
