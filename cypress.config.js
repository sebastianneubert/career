const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      SITE_UNDER_TEST: 'https://docs.cypress.io/'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
