const { registerQuery } = require('./utils')

registerQuery('toPlainObject', () => {
  const log = Cypress.log({ name: 'toPlainObject' })

  return (subject) => {
    return JSON.parse(JSON.stringify(subject))
  }
})
