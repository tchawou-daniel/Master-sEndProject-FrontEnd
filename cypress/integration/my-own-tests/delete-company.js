describe('Delete a new company', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('http://localhost:3000/');
    // check the link
    cy.url().should('eq', 'http://localhost:3000/');
  });

  // Login part
  it('Login and create a company', () => {
    // 1. go to the page Compte page
    cy.contains('Mon compte').click({ force: true });
    // check if we are on the right
    cy.url().should('eq', 'http://localhost:3000/auth/register/callback');
    // 2. go to the page Sign In page
    cy.contains('Already have an account? Sign Up').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/auth/login/callback');

    cy.get('[name="email"]').type('jeremi@hotmail.com', { force: true });
    cy.get('[name="password"]').type('SuperSecretP4word', { force: true });
    cy.contains('Submit').click({ force: true });

    cy.get('[name="delete-Yper"]').click({ force: true });
    cy.get('[name="confirm-button"]').click({ force: true });
  });
});
