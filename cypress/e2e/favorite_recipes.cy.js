describe('Favorite recipes', () => {
  beforeEach(() => {
    cy.login('prueba@prueba.com', '1234Prueba')
    cy.url().should('include', '/recipe')
  })

  it('mark and unmark as favorite a recipe', () => {
    cy.intercept(
      'POST',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent'
    ).as('getRecipe')
    cy.createRecipe('Queso y jamón', 'Desayuno', 15, 25)
    cy.wait('@getRecipe')
    cy.get('#button-favorite').click()
    cy.contains('Se ha guardado la información correctamente').should('exist')
    cy.get('#button-delete-favorite').click()
    cy.contains('Se ha eliminado la receta de favoritos').should('exist')
  })

  it('view favorite recipes', () => {
    cy.visit('/user-recipes')
    cy.contains('h1', 'Recetas guardadas')
  })
})
