/// <reference types="cypress" />

const {
  registerQuery,
  findTimeout,
  isArrayOfStrings,
} = require('./utils')

const repoUrl = 'https://github.com/bahmutov/cypress-map'
const repoLink = `[${repoUrl}](${repoUrl})`

registerQuery('map', function (fnOrProperty, options = {}) {
  const timeout = findTimeout(this, options)

  // make sure this query command respects the timeout option
  this.set('timeout', timeout)

  if (isArrayOfStrings(fnOrProperty)) {
    // the user wants to pick the listed properties from the subject
    const message = fnOrProperty.join(', ')

    const log =
      options.log !== false &&
      Cypress.log({ name: 'map', message, timeout })
  } else if (Cypress._.isPlainObject(fnOrProperty)) {
    Object.keys(fnOrProperty).forEach((key) => {
      if (typeof fnOrProperty[key] !== 'function') {
        throw new Error(`Expected ${key} to be a function`)
      }
    })

    const message = Cypress._.map(fnOrProperty, (fn, key) => {
      return key + '=>' + (fn.name ? fn.name : '?')
    }).join(', ')

    const log =
      options.log !== false &&
      Cypress.log({ name: 'map', message, timeout })
  } else {
    const message =
      typeof fnOrProperty === 'string'
        ? fnOrProperty
        : fnOrProperty.name

    const log =
      options.log !== false &&
      Cypress.log({ name: 'map', message, timeout })
  }

  return ($el) => {
    if (Cypress._.isString($el)) {
      throw new Error(
        `cy.map is not meant to work with a string subject, did you mean cy.apply?\n${repoLink}`,
      )
    }
    if (Cypress._.isNumber($el)) {
      throw new Error(
        `cy.map is not meant to work with a number subject, did you mean cy.apply?\n${repoLink}`,
      )
    }
    if (Cypress._.isBoolean($el)) {
      throw new Error(
        `cy.map is not meant to work with a boolean subject, did you mean cy.apply?\n${repoLink}`,
      )
    }

    if (isArrayOfStrings(fnOrProperty)) {
      const result = {}
      fnOrProperty.forEach((key) => {
        if (!(key in $el)) {
          throw new Error(`Cannot find property ${key}`)
        }
        result[key] = $el[key]
      })
      return result
    } else if (Cypress._.isPlainObject(fnOrProperty)) {
      const result = { ...$el }
      Object.keys(fnOrProperty).forEach((key) => {
        if (!(key in $el)) {
          throw new Error(`Cannot find property ${key}`)
        }
        if (typeof fnOrProperty[key] !== 'function') {
          throw new Error(`Expected ${key} to be a function`)
        }
        result[key] = fnOrProperty[key]($el[key])
      })
      return result
    } else {
      // use a spread so that the result is an array
      // and used the Array constructor in the current iframe
      // so it passes the "instanceOf Array" assertion
      const list = [
        ...Cypress._.map($el, (item) =>
          typeof fnOrProperty === 'string'
            ? Cypress._.get(item, fnOrProperty)
            : fnOrProperty(item),
        ),
      ]
      return list
    }
  }
})
