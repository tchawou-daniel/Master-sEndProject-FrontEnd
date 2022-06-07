describe('Auth tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('http://localhost:3000/');
    // check the link
    cy.url().should('eq', 'http://localhost:3000/');
  });

  // Login part
  it('Login', () => {
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
  });

  it('Logout', () => {
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

    // check if we are on the right
    cy.url().should('eq', 'http://localhost:3000/companies');
    cy.get('[aria-controls="menu-appbar"]').click({ force: true });
    cy.contains('Log out').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Sign up', () => {
    // 1. go to the page Compte page
    cy.contains('Mon compte').click({ force: true });
    // check if we are on the right
    cy.url().should('eq', 'http://localhost:3000/auth/register/callback');

    cy.get('[name="firstName"]').type('my frist name', { force: true });
    cy.get('[name="lastName"]').type('my last name', { force: true });
    cy.get('[name="email"]').type('example4@gmail.com', { force: true });
    cy.get('[name="password"]').type('SuperSecretP4word', { force: true });
    cy.contains('Submit').click({ force: true });

    // check if we are on the right
    cy.url().should('eq', 'http://localhost:3000/auth/login/callback');
  });
});
