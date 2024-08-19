const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      SITE_UNDER_TEST: 'https://flowcv.me/sebastian-neubert-2k'
    },
    setupNodeEvents(on, config) {
      on('task', {
        getCertificate: (host) => {
          const sslCertificate = require('get-ssl-certificate')
          return sslCertificate.get(host)
        }
      })
    },
  },
});
