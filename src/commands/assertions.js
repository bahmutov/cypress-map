/// <reference types="cypress" />

chai.use((_chai) => {
  // use "function" syntax to make sure when Chai
  // calls it, the "this" object points at Chai

  //
  // should read assertion
  //
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

    const message = `expected ${texts.join(', ')} to read ${expectedValuesMessage}`
    // confirm the number of elements matches the number of expected strings
    this.assert(texts.length === strings.length, message)

    // confirm the texts match the expected strings
    const passed = Cypress._.every(strings, (s, i) => {
      if (Cypress._.isString(s)) {
        return texts[i] === s
      }
      if (Cypress._.isRegExp(s)) {
        return s.test(texts[i])
      }
      return false
    })

    this.assert(passed, message)
  }
  _chai.Assertion.addMethod('read', readAssertion)

  //
  // should possess assertion
  //
  function possesAssertion(propertyName, maybeValueOrPredicate) {
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
      const value = Cypress._.get(this._obj, propertyName)
      if (typeof maybeValueOrPredicate === 'function') {
        const functionName = maybeValueOrPredicate.name || 'function'
        return this.assert(
          maybeValueOrPredicate(value),
          `expected ${subjectShort} to pass the ${functionName} predicate`,
          `expected ${subjectShort} to not pass the ${functionName} predicate`,
        )
      } else {
        return this.assert(
          value === maybeValueOrPredicate,
          `expected ${subjectShort} to possess property ${propertyName}=${maybeValueOrPredicate}`,
          `expected ${subjectShort} to not possess property ${propertyName}=${maybeValueOrPredicate}`,
        )
      }
    }

    throw new Error(
      `Unexpected arguments to the "possess" assertion ${[...arguments].join(', ')}`,
    )
  }
  _chai.Assertion.addMethod('possess', possesAssertion)

  //
  // should unique assertion
  //
  function uniqueAssertion() {
    const values = this._obj

    if (!Array.isArray(values)) {
      throw new Error(
        `unique assertion: Expected an array, but got ${typeof values}`,
      )
    }

    // report duplicate values?
    const uniqueValues = new Set(values)
    return this.assert(
      uniqueValues.size === values.length,
      `expected ${values} to be unique`,
      `expected ${values} to not be unique`,
    )
  }
  _chai.Assertion.addMethod('unique', uniqueAssertion)

  //
  // should look assertion
  //
  /**
   * @param {string} expectedHtml
   */
  function lookAssertion(expectedHtml) {
    /**
     * @type {JQuery<HTMLElement>}
     */
    const $el = this._obj
    /**
     * @type {string}
     */
    const actualHtml = $el.prop('outerHTML')

    // Parse both actual and expected HTML into DOM trees
    const parser = new DOMParser()
    const actualDoc = parser.parseFromString(actualHtml, 'text/html')
    const expectedDoc = parser.parseFromString(
      expectedHtml,
      'text/html',
    )

    // Helper to compare nodes recursively
    function partialMatch(actualNode, expectedNode) {
      // Compare node type and tag name
      if (actualNode.nodeType !== expectedNode.nodeType) return false
      if (actualNode.nodeType === 1) {
        // Element
        if (actualNode.tagName !== expectedNode.tagName) return false
        // Compare id if present
        if (expectedNode.id && actualNode.id !== expectedNode.id)
          return false
        // Compare expected attributes
        for (let attr of expectedNode.attributes) {
          if (actualNode.getAttribute(attr.name) !== attr.value)
            return false
        }
        // Compare text if expectedNode has only text child
        const expectedText =
          expectedNode.childNodes.length === 1 &&
          expectedNode.childNodes[0].nodeType === 3
            ? expectedNode.childNodes[0].textContent.trim()
            : null
        if (expectedText !== null) {
          const actualText =
            actualNode.childNodes.length === 1 &&
            actualNode.childNodes[0].nodeType === 3
              ? actualNode.childNodes[0].textContent.trim()
              : null
          if (actualText !== expectedText) return false
        }
        // Recursively compare children (expectedNode may have fewer children)
        let actualChildren = Array.from(actualNode.children)
        let expectedChildren = Array.from(expectedNode.children)
        if (expectedChildren.length > actualChildren.length)
          return false
        for (let i = 0; i < expectedChildren.length; i++) {
          // Find a matching actual child for each expected child
          let found = false
          for (let j = 0; j < actualChildren.length; j++) {
            if (
              partialMatch(actualChildren[j], expectedChildren[i])
            ) {
              found = true
              break
            }
          }
          if (!found) return false
        }
        return true
      } else if (actualNode.nodeType === 3) {
        // Text
        return (
          actualNode.textContent.trim() ===
          expectedNode.textContent.trim()
        )
      }
      // Ignore other node types
      return true
    }

    // Compare the root nodes
    const actualRoot = actualDoc.body.firstElementChild
    const expectedRoot = expectedDoc.body.firstElementChild
    const passed = partialMatch(actualRoot, expectedRoot)

    // escape the expected html script tags in the assertion message
    const escapedExpectedHtml = expectedHtml
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    return this.assert(
      passed,
      `expected subject to partially look like "${escapedExpectedHtml}"`,
      `expected subject to not partially look like "${escapedExpectedHtml}"`,
    )
  }
  _chai.Assertion.addMethod('look', lookAssertion)
})
