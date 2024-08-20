import { defineConfig } from 'cypress'
import getSslCert from 'get-ssl-certificate'
import reportingPlugin from 'cypress-mochawesome-reporter/plugin'

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'SPVOS Frontend Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    saveJson: true,
  },
  e2e: {
    env: {
      SITE_UNDER_TEST: 'https://flowcv.me/sebastian-neubert-2k'
    },
    setupNodeEvents(on, config) {
      on('task', {
        getCertificate: (host) => {
          return getSslCert.get(host)
        }
      })
      reportingPlugin(on)
      return config
    },
  },
  retries: {
    experimentalStrategy: 'detect-flake-and-pass-on-threshold',
    experimentalOptions: {
      maxRetries: 2,
      passesRequired: 1,
    },
    runMode: true,
    openMode: true,
  },
});
