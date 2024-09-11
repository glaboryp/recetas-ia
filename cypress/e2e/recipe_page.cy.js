describe('Recipe page', () => {
  it('visit recipe page from the home page', () => {
    cy.visit('/')
    cy.contains('Comenzar').click()
    cy.url().should('include', '/recipe')
  })

  it('visit recipe page from the manu bar', () => {
    cy.visit('/')
    cy.get('.p-menubar-root-list')
      .contains('Recetas')
      .should('have.attr', 'href', '/recipe')
      .click()
    cy.url().should('include', '/recipe')
  })

  it('create a correct recipe', () => {
    cy.intercept(
      'POST',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
    ).as('getRecipe')
    cy.createRecipe('Queso y jamón', 'Desayuno', 15, 25)
    cy.contains('Preparando tu receta').should('exist')
    cy.wait('@getRecipe')
    cy.contains('h2', 'Receta')
  })

  it('create a recipe without ingredients', () => {
    cy.createRecipe(null, 'Desayuno', 15, 25)
    cy.contains('Debes introducir al menos un ingrediente').should('exist')
  })

  it('create a recipe without lunch', () => {
    cy.createRecipe('Arroz, lentejas y zanahorias', null, 15, 25)
    cy.contains('Debes seleccionar la comida que quieres').should('exist')
  })
})
