/// <reference types="cypress" />

Cypress.Commands.addQuery('map', (fnOrProperty) => {
  return ($el) =>
    Cypress._.map($el, (item) =>
      typeof fnOrProperty === 'string'
        ? item[fnOrProperty]
        : fnOrProperty(item),
    )
})
