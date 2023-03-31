// to avoid relying on old polyfills for node "format"
// use a custom formatter plus our own code
const format = require('string-format')

function formatTitle(pattern, x) {
  if (pattern.includes('{}') || pattern.includes('{0}')) {
    x = JSON.stringify(x)
  }
  if (pattern.includes('%d')) {
    return pattern.replace('%d', x)
  }
  if (pattern.includes('%o')) {
    return pattern.replace('%o', JSON.stringify(x))
  }
  return format(pattern, x)
}

const { registerQuery } = require('./utils')

registerQuery('print', (formatPattern) => {
  const log = Cypress.log({ name: 'print', message: '' })

  if (typeof formatPattern === 'string') {
    return (subject) => {
      const formatted = formatTitle(formatPattern, subject)
      log.set('message', formatted)
      return subject
    }
  } else if (typeof formatPattern === 'function') {
    return (subject) => {
      let formatted = formatPattern(subject)
      if (typeof formatted !== 'string') {
        formatted = JSON.stringify(formatted)
      }
      log.set('message', formatted)
      return subject
    }
  } else {
    return (subject) => {
      log.set('message', JSON.stringify(subject))
      return subject
    }
  }
})
