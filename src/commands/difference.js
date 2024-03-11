/// <reference types="cypress" />

const { registerQuery } = require('./utils')

const toDifference = (o) => {
  if (typeof o === 'function') {
    return o.name || 'fn'
  } else {
    return o
  }
}

function diffTwoObjects(expected, subject) {
  const names = Object.keys(expected)
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
      } else if (!Cypress._.isEqual(actual, expectedValue)) {
        diff[name] = { actual, expected: expectedValue }
      }
    }
  })
  Object.keys(subject).forEach((name) => {
    if (!(name in expected)) {
      diff[name] = { extra: true, actual: subject[name] }
    }
  })

  return diff
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
    logOptions.message = Object.entries(expected)
      .map(([k, v]) => `${k}: ${toDifference(v)}`)
      .join(', ')
  }
  const log = Cypress.log(logOptions)

  return (subject) => {
    const diff = {}

    if (Array.isArray(subject) && Cypress._.isPlainObject(expected)) {
      // check each item in the subject array
      // against the expected object or its predicates
      subject.forEach((actual, index) => {
        const aDiff = diffTwoObjects(expected, actual)
        if (!Cypress._.isEmpty(aDiff)) {
          diff[index] = aDiff
        }
      })
    } else {
      const aDiff = diffTwoObjects(expected, subject)
      Object.assign(diff, aDiff)
    }

    log.set('consoleProps', () => {
      return { expected, subject, diff }
    })

    return diff
  }
})
