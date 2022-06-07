describe('Create a new company', () => {
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

    cy.get('[name="email"]').type('jeremi@gmail.com', { force: true });
    cy.get('[name="password"]').type('SuperSecretP4word', { force: true });
    cy.contains('Submit').click({ force: true });

    cy.contains('Create a company').click({ force: true });
    cy.get('[role="dialog"]').should('be.visible');

    cy.get('[name="name"]').type('name', { force: true });
    cy.get('[name="street"]').type('street', { force: true });
    cy.get('[name="town"]').type('town', { force: true });
    cy.get('[name="zipCode"]').type('zipCode', { force: true });
    cy.get('[name="country"]').type('country', { force: true });
    cy.get('[name="description"]').type('description', { force: true });
  });
});
