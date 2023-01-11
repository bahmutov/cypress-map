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

Cypress.Commands.addQuery('print', (formatPattern) => {
  const log = Cypress.log({ name: 'print', message: '' })

  return (subject) => {
    if (typeof formatPattern === 'string') {
      const formatted = formatTitle(formatPattern, subject)
      log.set('message', formatted)
    } else {
      log.set('message', JSON.stringify(subject))
    }
    return subject
  }
})
