/// <reference types="cypress" />

const { registerQuery } = require('./utils')

const toDifference = (o) => {
  if (typeof o === 'function') {
    return o.name || 'fn'
  } else {
    return o
  }
}

registerQuery('difference', (expected) => {
  const logOptions = {
    name: 'difference',
    type: 'child',
  }
  if (Array.isArray(expected)) {
    logOptions.message =
      '[' + expected.map(toDifference).join(', ') + ']'
  } else {
    logOptions.message = JSON.stringify(expected, null, 2)
  }
  const log = Cypress.log(logOptions)

  const names = Object.keys(expected)
  return (subject) => {
    const diff = {}
    names.forEach((name) => {
      if (!(name in subject)) {
        diff[name] = { missing: true, expected: expected[name] }
      } else {
        const actual = subject[name]
        const expectedValue = expected[name]
        // console.log({ name, actual, expectedValue })

        if (typeof expectedValue === 'function') {
          if (expectedValue(actual) === false) {
            const predicteName = expectedValue.name
            diff[name] = {
              message: `value ${actual} did not pass predicate "${predicteName}"`,
            }
          }
        } else if (actual !== expectedValue) {
          diff[name] = { actual, expected: expectedValue }
        }
      }
    })
    Object.keys(subject).forEach((name) => {
      if (!(name in expected)) {
        diff[name] = { extra: true, actual: subject[name] }
      }
    })

    log.set('consoleProps', () => {
      return { expected, subject, diff }
    })

    return diff
  }
})
