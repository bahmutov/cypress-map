/// <reference path="../../src/commands/index.d.ts" />
// @ts-check

// import cypress-map plugin
import '../../commands'

describe('cy.invokeFirst', () => {
  expect('invokeFirst' in cy).to.be.true

  it('calls the given method on the first item', () => {
    cy.wrap(
      [
        {
          getName: cy.stub().as('first').returns('Joe'),
        },
        {
          getName: cy.stub().as('second').returns('Mary'),
        },
      ],
      { log: false },
    )
      .invokeFirst('getName')
      .should('equal', 'Joe')

    cy.log('**confirm the first item was called**')
    cy.get('@first').should('have.been.calledOnce')
    cy.get('@second').should('not.have.been.called')
  })
})
