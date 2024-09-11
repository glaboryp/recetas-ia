Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('#username').type(email)
  cy.get('#passwordUser').type(password)
  cy.get('#button-login').click()
})

Cypress.Commands.add('createRecipe', (ingredients, lunch, persons, time) => {
  cy.visit('/recipe')
  if (ingredients) cy.get('#ingredients').type(ingredients)
  if (lunch) {
    cy.get('#lunch').click()
    cy.get(`#lunch_list > li[aria-label=${lunch}]`).click()
  }
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
