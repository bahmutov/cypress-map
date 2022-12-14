// confirm the first LI element has text
// that is either 'first' or 'primo'

it('checks the text is one of the variants: single should callback', () => {
  cy.visit('cypress/index.html')
  cy.get('#items li').should(($li) => {
    expect($li.first().text()).to.be.oneOf(['first', 'primo'])
  })
})

it('checks the text is one of the variants: regex', () => {
  cy.visit('cypress/index.html')
  cy.contains('#items li:first', /^(first|primo)$/)
})

it('checks the text is one of the variants: v12 queries', () => {
  cy.visit('cypress/index.html')
  cy.get('#items li')
    .first()
    .invoke('text')
    .should('be.oneOf', ['first', 'primo'])
})
