/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import '@testing-library/cypress/add-commands'

declare global {
  namespace Cypress {
    interface Chainable {
      getButton(buttonText: string): Chainable<JQuery>

      checkCertificate(url: string, daysBeforeWarning?: number): Chainable<void>
    }
  }
}

Cypress.Commands.add('getButton', (buttonText) => {
  const regEx = new RegExp(buttonText, 'i')
  cy.findByRole('button', { name: regEx })
})

Cypress.Commands.add('checkCertificate', (url, daysBeforeWarning = 14) => {
  const hostname = new URL(url).hostname

  cy.task('getCertificate', hostname)
    .its('valid_to')
    .then((validTo) => {
      cy.log(`Certificate expires on ${validTo}`)
      const expiryDate = new Date(validTo).getTime()
      const warningDate = new Date().getTime() + (daysBeforeWarning * 24 * 60 * 60 * 1000)
      expect(expiryDate, `Certificate expire within next ${daysBeforeWarning} days`).to.be.greaterThan(warningDate)
    })
})