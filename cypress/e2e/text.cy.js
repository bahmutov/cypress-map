it('checks the text is one of the variants', () => {
  cy.visit('cypress/index.html')
  cy.get('#items li')
    .first()
    .invoke('text')
    .should('be.oneOf', ['first', 'second'])
})
