/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('difference', (expected) => {
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

        if (actual !== expectedValue) {
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
})
