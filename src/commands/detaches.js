/// <reference types="cypress" />
// @ts-check

const { registerQuery } = require('./utils')

registerQuery('detaches', (selectorOrAlias) => {
  if (typeof selectorOrAlias !== 'string') {
    throw new Error('Selector/alias must be a string')
  }

  const log = Cypress.log({
    name: 'detaches',
    message: String(selectorOrAlias),
  })

  if (selectorOrAlias[0] === '@') {
    return () => {
      const $el = Cypress.env(selectorOrAlias.slice(1))
      if (!$el) {
        throw new Error(
          `Element with alias "${selectorOrAlias}" not found`,
        )
      }
      if (!$el.length) {
        throw new Error(`Expected one element, found ${$el.length}`)
      }
      if (Cypress.dom.isAttached($el[0])) {
        throw new Error(
          `Expected element is still attached to the DOM`,
        )
      }
    }
  } else {
    let el = null
    return () => {
      if (!el) {
        // @ts-expect-error
        const doc = cy.state('document')
        el = doc.querySelector(selectorOrAlias)
      }

      if (!Cypress.dom.isDetached(el)) {
        throw new Error(`Expected element to be detached`)
      }
    }
  }
})
