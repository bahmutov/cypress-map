/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('map', (fnOrProperty) => {
  const message =
    typeof fnOrProperty === 'string'
      ? fnOrProperty
      : fnOrProperty.name
  const log = Cypress.log({ name: 'map', message })

  return ($el) => {
    // use a spread so that the result is an array
    // and used the Array constructor in the current iframe
    // so it passes the "instanceOf Array" assertion
    const list = [
      ...Cypress._.map($el, (item) =>
        typeof fnOrProperty === 'string'
          ? item[fnOrProperty]
          : fnOrProperty(item),
      ),
    ]
    return list
  }
})
