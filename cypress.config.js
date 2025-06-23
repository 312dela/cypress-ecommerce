const { defineConfig } = require("cypress");
const { getAndIncrementEmailCounter } = require('./cypress/utils/getEmailCounter');

function setupNodeEvents(on, config) {
  require('cypress-mochawesome-reporter/plugin')(on);

  on('task', {
    getIncrementedEmail() {
      const count = getAndIncrementEmailCounter();
      return `account${count}@yopmail.com`;
    },
  });

  return config;
}

module.exports = defineConfig({
  e2e: {
    video: true,
    setupNodeEvents,
    reporter: 'cypress-mochawesome-reporter',
    specPattern: 'cypress/e2e/*.cy.js'
  },
});
