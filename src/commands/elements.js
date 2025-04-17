/// <reference types="cypress" />

const { registerQuery } = require('./utils')

function getElements(parentSelector, ...childSelectors) {
  const log = Cypress.log({
    name: 'elements',
    message: `"${parentSelector}" [${childSelectors.join(', ')}]`,
  })

  return () => {
    // TODO: add the elements to the log
    const doc = cy.state('document')
    const texts = []
    Cypress.$(doc)
      .find(parentSelector)
      .each((index, parent) => {
        const childTexts = []
        childSelectors.forEach((childSelector) => {
          const child = Cypress.$(parent).find(childSelector)
          if (child.length) {
            const text = child.text()
            childTexts.push(text)
          }
        })
        texts.push(childTexts)
      })
    return texts
  }
}

registerQuery('elements', getElements)
