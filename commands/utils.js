/// <reference types="cypress" />

/**
 * @see https://on.cypress.io/custom-commands
 */
function registerQuery(name, fn) {
  // prevent double registration attempt
  if (!(name in cy)) {
    return Cypress.Commands.addQuery(name, fn)
  }
}

function registerCommand(name, options, fn) {
  // prevent double registration attempt
  if (!(name in cy)) {
    if (typeof options === 'function') {
      return Cypress.Commands.add(name, fn)
    } else {
      return Cypress.Commands.add(name, options, fn)
    }
  }
}

module.exports = { registerQuery, registerCommand }
