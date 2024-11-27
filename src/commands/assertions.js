/// <reference types="cypress" />

chai.use((_chai) => {
  // use "function" syntax to make sure when Chai
  // calls it, the "this" object points at Chai

  function readAssertion(strings) {
    if (Cypress._.isString(strings) || Cypress._.isRegExp(strings)) {
      strings = [strings]
    }

    if (strings.length === 0) {
      throw new Error(
        'Expected at least one string or regular expression',
      )
    }
    // TODO: handle longer lists of expected strings
    const texts = Cypress._.map(this._obj, 'innerText')
    const expectedValuesMessage = strings
      .map((s) => {
        return Cypress._.isString(s) ? s : s.toString()
      })
      .join(', ')

    const passed = Cypress._.every(strings, (s, i) => {
      if (Cypress._.isString(s)) {
        return texts[i] === s
      }
      if (Cypress._.isRegExp(s)) {
        return s.test(texts[i])
      }
      return false
    })

    this.assert(
      passed,
      `expected ${texts.join(', ')} to read ${expectedValuesMessage}`,
    )
  }
  _chai.Assertion.addMethod('read', readAssertion)
})
