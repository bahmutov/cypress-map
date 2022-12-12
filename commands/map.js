/// <reference types="cypress" />

Cypress.Commands.addQuery('map', (fnOrProperty) => {
  const message =
    typeof fnOrProperty === 'string' ? fnOrProperty : fnOrProperty.name
  const log = Cypress.log({ name: 'map', message })

  return ($el) =>
    Cypress._.map($el, (item) =>
      typeof fnOrProperty === 'string'
        ? item[fnOrProperty]
        : fnOrProperty(item),
    )
})
