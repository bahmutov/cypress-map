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

/**
 * Finds the timeout option from this command or from its parent command
 */
function findTimeout(cmd, options = {}) {
  if (Cypress._.isFinite(options.timeout)) {
    return options.timeout
  }

  const defaultTimeout = Cypress.config('defaultCommandTimeout')
  if (!cmd) {
    return defaultTimeout
  }
  const prev = cmd.attributes?.prev
  const prevTimeout = prev?.attributes?.timeout
  if (Cypress._.isFinite(prevTimeout)) {
    return prevTimeout
  }
  if (prev.attributes.args?.length) {
    const lastArg = prev.attributes.args.at(-1)
    if (Cypress._.isFinite(lastArg?.timeout)) {
      return lastArg?.timeout
    }
  }

  return defaultTimeout
}

/**
 * Returns true if the argument is an array of strings.
 * Note: an empty array is not considered an array of strings.
 */
function isArrayOfStrings(x) {
  return (
    Cypress._.isArray(x) &&
    x.length &&
    x.every((item) => typeof item === 'string')
  )
}

module.exports = {
  registerQuery,
  registerCommand,
  findTimeout,
  isArrayOfStrings,
}
