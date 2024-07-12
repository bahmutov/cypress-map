/// <reference types="cypress" />

const { registerQuery } = require('./utils')

registerQuery('apply', (callback, ...args) => {
  if (typeof callback !== 'function') {
    throw new Error('Expected a function to apply')
  }

  const log = Cypress.log({ name: 'apply', message: callback.name })

  return (subject) => {
    log.set({
      $el: subject,
    })
    return callback(...args, subject)
  }
})

registerQuery('applyRight', (callback, ...args) => {
  if (typeof callback !== 'function') {
    throw new Error('Expected a function to apply')
  }

  const log = Cypress.log({
    name: 'applyRight',
    message: callback.name,
  })

  return (subject) => {
    log.set({
      $el: subject,
    })
    return callback(subject, ...args)
  }
})

registerQuery('applyToFirst', (callback, ...args) => {
  if (typeof callback !== 'function') {
    throw new Error('Expected a function to apply')
  }

  const log = Cypress.log({
    name: 'applyToFirst',
    message: callback.name,
  })

  return (subject) => {
    if (Cypress.dom.isJquery(subject) || Array.isArray(subject)) {
      log.set({
        $el: subject,
      })
      return callback(...args, subject[0])
    } else {
      throw new Error('Expected a jQuery object or an array subject')
    }
  }
})

registerQuery('applyToFirstRight', (callback, ...args) => {
  if (typeof callback !== 'function') {
    throw new Error('Expected a function to apply')
  }

  const log = Cypress.log({
    name: 'applyToFirstRight',
    message: callback.name,
  })

  return (subject) => {
    if (Cypress.dom.isJquery(subject) || Array.isArray(subject)) {
      log.set({
        $el: subject,
      })
      return callback(subject[0], ...args)
    } else {
      throw new Error('Expected a jQuery object or an array subject')
    }
  }
})
