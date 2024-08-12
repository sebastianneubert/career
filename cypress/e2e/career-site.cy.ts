const sites = ['https://docs.cypress.io/']

describe.each(sites)('check %s', (site) => {
  beforeEach(() => {
    cy.visit(site)
  })

  it('should have a career link', () => {
    cy.findByRole('link', { name: /careers?|jobs?/i })
      .should('have.length', 1)
      .as('careerLink')

    cy.get('@careerLink').click()
  })
})
