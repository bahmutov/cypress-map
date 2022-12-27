const major = Cypress.version.split('.').map(Number)[0]
if (major < 12) {
  throw new Error(`cypress-map requires Cypress version >= 12`)
}
