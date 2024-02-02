const { registerQuery } = require('./utils')

registerQuery('toPlainObject', (conversionType = 'json') => {
  const log = Cypress.log({
    name: 'toPlainObject',
    message: conversionType,
  })

  const jsonConversion = (subject) => {
    return JSON.parse(JSON.stringify(subject))
  }
  const entriesConversion = (subject) => {
    return Object.fromEntries(subject.entries())
  }

  if (conversionType === 'json') {
    return jsonConversion
  } else if (conversionType === 'entries') {
    return entriesConversion
  } else {
    throw new Error(`unknown conversion type: ${conversionType}`)
  }
})
