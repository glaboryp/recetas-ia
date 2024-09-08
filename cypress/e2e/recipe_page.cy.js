// https://on.cypress.io/api

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
    cy.createRecipe('Queso y jamón', 'Desayuno', 15, 25)
    cy.contains('Preparando tu receta').should('exist')
    cy.contains('h2', 'Receta')
  })
  it('create a recipe without ingredients', () => {
    cy.createRecipe('', 'Desayuno', 15, 25)
    cy.contains('Debes introducir al menos un ingrediente').should('exist')
  })
})
