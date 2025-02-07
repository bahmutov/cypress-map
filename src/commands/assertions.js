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

  function possesAssertion(propertyName, maybeValue) {
    if (typeof propertyName !== 'string') {
      throw new Error(
        `possess assertion: Expected a string, but got ${typeof propertyName}`,
      )
    }

    const subjectText = JSON.stringify(this._obj)
    const subjectShort =
      subjectText.length > 40
        ? `${subjectText.slice(0, 40)}...`
        : subjectText

    if (arguments.length === 1) {
      return this.assert(
        propertyName in this._obj,
        `expected ${subjectShort} to possess property "${propertyName}"`,
        `expected ${subjectShort} to not possess property "${propertyName}"`,
      )
    }
    if (arguments.length === 2) {
      return this.assert(
        Cypress._.get(this._obj, propertyName) === maybeValue,
        `expected ${subjectShort} to possess property ${propertyName}=${maybeValue}`,
        `expected ${subjectShort} to not possess property ${propertyName}=${maybeValue}`,
      )
    }

    throw new Error(
      `Unexpected arguments to the "possess" assertion ${[...arguments].join(', ')}`,
    )
  }
  _chai.Assertion.addMethod('possess', possesAssertion)
})
