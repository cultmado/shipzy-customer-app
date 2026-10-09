describe('Login', () => {
  it('shows the login form', () => {
    cy.visit('/login')
    cy.contains('h1', 'Login')
    cy.contains('button', 'Log In')
  })
})
