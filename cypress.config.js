const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      SITE_UNDER_TEST: 'https://flowcv.me/sebastian-neubert-2k'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
