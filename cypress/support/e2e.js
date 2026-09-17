// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
// Alternatively you can use CommonJS syntax:
// require('./commands')

let browserConsoleLogs = []

Cypress.on('window:before:load', (win) => {
  browserConsoleLogs = []
  ;['log', 'error', 'warn'].forEach((method) => {
    const original = win.console[method]
    win.console[method] = (...args) => {
      browserConsoleLogs.push(`[console.${method}] ${args.map(String).join(' ')}`)
      original.apply(win.console, args)
    }
  })
})

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    browserConsoleLogs.forEach((message) => cy.task('log', message))
  }
})
