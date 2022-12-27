/// <reference types="cypress" />

it('parses Cypress version', () => {
  console.log(Cypress.version)
  const [major, minor, patch] = Cypress.version.split('.').map(Number)
  console.log({ major, minor, patch })
  expect(major, 'Cypress major version').to.be.gte(12)
})
