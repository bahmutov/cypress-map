/// <reference types="cypress" />

function registerQueryCommand(name, fn) {
  // prevent double registration attempt
  if (!(name in cy)) {
    Cypress.Commands.addQuery(name, fn)
  }
}

module.exports = { registerQueryCommand }
