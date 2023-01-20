/// <reference types="cypress" />
// @ts-check

// import cypress-map plugin
import '../../commands'

describe('invoke vs invokeOnce', () => {
  const app = {
    fetchName() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('My App')
        }, 1000)
      })
    },

    add(a, b) {
      return Promise.resolve(a + b)
    },
  }

  it('cy.then yields the resolved value', () => {
    // call the method ourselves from "cy.then"
    cy.wrap(app)
      .then((app) => app.fetchName())
      .should('equal', 'My App')
  })

  it('cy.invoke yields the promise', () => {
    cy.wrap(app)
      .invoke('fetchName')
      .should('satisfy', (x) => typeof x.then === 'function')
      // then we can check the resolved value
      .then((s) => expect(s).to.equal('My App'))

    // we can use a truthy assertion to "wait" for the promise
    cy.wrap(app)
      .invoke('fetchName')
      .should('be.ok')
      // and then we can check the resolved value
      .then((s) => expect(s).to.equal('My App'))
  })

  it('calls the method and yields the resolved value', () => {
    cy.wrap(app).invokeOnce('fetchName').should('equal', 'My App')
  })

  it('passes method arguments', () => {
    cy.wrap(app).invokeOnce('add', 2, 3).should('equal', 5)
  })
})
