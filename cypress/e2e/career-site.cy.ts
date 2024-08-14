const siteUnderTest = Cypress.env('SITE_UNDER_TEST')

describe(`check ${siteUnderTest}`, () => {
  beforeEach(() => {
    cy.log(siteUnderTest)
    cy.visit(siteUnderTest)
  })

  it('should have a career link', () => {
    cy.findByRole('link', { name: /careers?|jobs?/i })
      .should('have.length', 1)
      .as('careerLink')

    cy.get('@careerLink').click()
  })
})
