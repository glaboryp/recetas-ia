// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createRecipe', (ingredients, lunch, persons, time) => {
  cy.visit('/recipe')
  cy.get('#ingredients').type(ingredients)
  cy.get('#lunch').click()
  cy.get('#lunch_list > li').should('have.text', lunch).click()
  cy.get('#persons').type(persons)

  const currentValue = 5
  const targetValue = time
  const increment = 10
  const steps = (targetValue - currentValue) / increment
  const arrows = '{rightarrow}'.repeat(steps)

  cy.get('.p-slider-handle')
    .as('slider')
    .should('have.attr', 'aria-valuenow', currentValue)
    .type(arrows)

  cy.get('.p-slider-handle').should('have.attr', 'aria-valuenow', targetValue)
  cy.get('@slider').parent().siblings('span').should('have.text', `${time} minutos`)
  cy.get('#button-create').click()
})
