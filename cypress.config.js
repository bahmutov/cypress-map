const { defineConfig } = require('cypress')
// https://github.com/bahmutov/cypress-split
const cypressSplit = require('cypress-split')

module.exports = defineConfig({
  defaultBrowser: 'electron',
  e2e: {
    // baseUrl, etc
    viewportHeight: 200,
    viewportWidth: 200,
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
      cypressSplit(on, config)
      // IMPORTANT: return the config object
      return config
    },
  },
})
