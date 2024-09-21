describe(
  `visit job sites to check if there are any new roles`,
  {
    retries: {
      runMode: 0,
      openMode: 0,
    },
  },
  () => {
    const jobSites = [
      'https://jobs.ashbyhq.com/kraken.com',
      'https://jobs.ashbyhq.com/polygon-labs',
      'https://jobs.lever.co/ondofinance',
      'https://jobs.ashbyhq.com/chainlink-labs',
      //'https://remoteok.com/',
    ]

    it.each(jobSites)('Check job site %s', (jobSite) => {
      cy.log(jobSite)
      cy.visit(jobSite)

      // alert, if there is any role containing `test` or `quality`
      cy.get('body').should('not.contain', 'test', { matchCase: false })
      cy.get('body').should('not.contain', 'quality', { matchCase: false })
      cy.get('body').should('not.contain', 'qa', { matchCase: false })
    })

    it('Check Scalable Capital', () => {
      cy.visit('https://careers.smartrecruiters.com/ScalableGmbH')

      // alert, if there is any role containing `test` or `quality`
      cy.get('body').should('not.contain', 'quality', { matchCase: false })
      cy.get('body').should('not.contain', 'qa', { matchCase: false })

      cy.request(
        'https://careers.smartrecruiters.com/ScalableGmbH/api/more?type=department&value=2519492&page=1'
      ).then((response) => {
        expect(response.status).to.be.eq(200)
        expect(response.body).to.not.contain('qa')
        expect(response.body).to.not.contain('test')
        expect(response.body).to.not.contain('quality')
      })
    })

    it.skip('Check stripe', () => {
      const urls = [
        //  'https://stripe.com/jobs/search?query=qa&office_locations=Europe--Amsterdam&office_locations=Europe--Berlin&office_locations=Europe--Bucharest&office_locations=Europe--Dublin&office_locations=Europe--London&office_locations=Europe--Madrid&office_locations=Europe--Paris&office_locations=Europe--Stockholm&office_locations=Europe--Warsaw',
        //  'https://stripe.com/jobs/search?query=quality&office_locations=Europe--Amsterdam&office_locations=Europe--Berlin&office_locations=Europe--Bucharest&office_locations=Europe--Dublin&office_locations=Europe--London&office_locations=Europe--Madrid&office_locations=Europe--Paris&office_locations=Europe--Stockholm&office_locations=Europe--Warsaw',
        //  'https://stripe.com/jobs/search?query=test&office_locations=Europe--Amsterdam&office_locations=Europe--Berlin&office_locations=Europe--Bucharest&office_locations=Europe--Dublin&office_locations=Europe--London&office_locations=Europe--Madrid&office_locations=Europe--Paris&office_locations=Europe--Stockholm&office_locations=Europe--Warsaw',
      ]

      urls.forEach((url) => {
        cy.visit(url, { failOnStatusCode: false })
        cy.contains('No open roles match your search')
        cy.findByRole('button', { name: /clear all filters/i }).should('be.visible')
      })

      cy.visit('https://stripe.com/jobs/search')
      cy.findByRole('textbox', { name: /Search for a job/i }).type('qa')
    })

    it.skip('Check circle.com', () => {
      cy.visit('https://www.circle.com/en/careers#career-listings', { failOnStatusCode: false })
      // accept cookies
      cy.get('#onetrust-accept-btn-handler').click()
      cy.findByRole('heading', { name: /engineering/i }).click()
    })
  }
)
