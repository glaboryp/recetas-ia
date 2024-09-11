describe('Login Test Feature', () => {
  it('user can not access to protected routes when not logged in', () => {
    cy.visit('/user-recipes')
    cy.url().should('include', '/login')
    cy.visit('/profile')
    cy.url().should('include', '/login')
  })

  it('user with wrong credentials can not login', () => {
    cy.login('example@invalid.com', 'invalidpassword')
    cy.contains('El usuario o la contraseña es incorrecta')
    cy.visit('/user-recipes')
    cy.url().should('include', '/login')
  })

  it('user can successfully login', () => {
    cy.login('prueba@prueba.com', '1234Prueba')
    cy.url().should('include', '/recipe')
  })
})
