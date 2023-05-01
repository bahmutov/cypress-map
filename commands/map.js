/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('map', (fnOrProperty) => {
  if (Cypress._.isPlainObject(fnOrProperty)) {
    Object.keys(fnOrProperty).forEach((key) => {
      if (typeof fnOrProperty[key] !== 'function') {
        throw new Error(`Expected ${key} to be a function`)
      }
    })

    const message = Cypress._.map(fnOrProperty, (fn, key) => {
      return key + '=>' + (fn.name ? fn.name : '?')
    }).join(', ')
    const log = Cypress.log({ name: 'map', message })
  } else {
    const message =
      typeof fnOrProperty === 'string'
        ? fnOrProperty
        : fnOrProperty.name
    const log = Cypress.log({ name: 'map', message })
  }

  return ($el) => {
    if (Cypress._.isPlainObject(fnOrProperty)) {
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
