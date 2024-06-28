/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('sample', (n = 1) => {
  if (n < 1) {
    throw new Error(`Sample size should be positive, was ${n}`)
  }

  if (n === 1) {
    const log = Cypress.log({ name: 'sample' })

    return (subject) => {
      // console.log('pick 1 sample')
      if (Cypress.dom.isJquery(subject)) {
        const randomElement = Cypress._.sample(subject.toArray())
        // wrap into jQuery object so other commands
        // can be attached, like cy.click
        return Cypress.$(randomElement)
      }

      // console.log('picked sample', sample)
      const currCommand = cy.state('current').attributes
      if (
        currCommand.name === 'as' &&
        currCommand.args[1]?.type === 'static'
      ) {
        // console.log(
        //   'current command',
        //   cy.state('current').attributes.name,
        // )
        if (
          cy.state('current').attributes?.prev?.attributes?.name ===
          'sample'
        ) {
          // console.log(cy.state('current').attributes.prev.attributes)
          const prevSubject =
            cy.state('current').attributes.prev.attributes.subject
          // console.log('returning prev sampled subject', prevSubject)

          return prevSubject
        }
      }
      const sample = Cypress._.sample(subject)
      // console.log(cy.state('current').attributes.name)
      // console.log(cy.state('current').attributes)
      // console.log('sampled subject', sample)
      // debugger
      return sample
    }
  } else {
    const log = Cypress.log({ name: 'sample', message: String(n) })

    return (subject) => {
      // console.log('pick N samples')
      if (Cypress.dom.isJquery(subject)) {
        const randomElement = Cypress._.sampleSize(
          subject.toArray(),
          n,
        )
        // wrap into jQuery object so other commands
        // can be attached, like cy.click
        return Cypress.$(randomElement)
      }

      return Cypress._.sampleSize(subject, n)
    }
  }
})
