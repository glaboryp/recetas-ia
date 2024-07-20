// https://on.cypress.io/api

describe('Visit home page', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', '¿Tienes poco tiempo')
  })
})
