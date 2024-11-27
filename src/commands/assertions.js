/// <reference types="cypress" />

chai.use((_chai) => {
  // use "function" syntax to make sure when Chai
  // calls it, the "this" object points at Chai

  function readAssertion(strings) {
    if (typeof strings === 'string') {
      strings = [strings]
    }

    if (strings.length === 0) {
      throw new Error('Expected at least one string')
    }
    // TODO: handle longer lists of expected strings
    const texts = Cypress._.map(this._obj, 'innerText')
    this.assert(
      Cypress._.isEqual(texts, strings),
      `expected ${texts.join(', ')} to read ${strings.join(', ')}`,
    )
  }
  _chai.Assertion.addMethod('read', readAssertion)
})
