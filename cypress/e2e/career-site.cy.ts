const siteUnderTest = Cypress.env('SITE_UNDER_TEST')

describe(`check ${siteUnderTest}`, () => {
  beforeEach(() => {
    cy.log(siteUnderTest)
    cy.visit(siteUnderTest)
  })

  it('Should have basic components', () => {
    cy.findByRole('heading', { name: /sebastian neubert/i })
      .should('have.length', 1)

    cy.findByRole('heading', { name: /senior quality engineer/i })
      .should('have.length', 1)

    cy.get('a[href]').should('have.length.at.least', 5).as('siteLinks')

    cy.get('@siteLinks').each((link)=>{
      expect(link).to.have.attr('href')
      expect(link.attr('href')).to.match(/https:|mailto:/i)
    })
  })

  it('Should have a valid ssl certificate', ()=>{
    cy.checkCertificate(siteUnderTest)
  })

  it('Should see button to career', () => {
    cy.findByRole('link', {name: /career project/i})
      .should('be.visible')
      .as('careerButton')

    cy.get('@careerButton').should('have.attr','href', 'https://github.com/sebastianneubert/career')
    cy.get('@careerButton').should('have.attr','target', '_blank')
    cy.get('@careerButton').invoke('removeAttr', 'target').click()

    cy.origin('https://github.com', () => {
      cy.get('h1').should('contain', 'career summary', {matchCase:false})
      cy.url().should('be.equal', 'https://github.com/sebastianneubert/career')
    })
  })
})
