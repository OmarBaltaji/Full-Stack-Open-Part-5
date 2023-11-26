describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', { username: 'root', password: 'password', name: 'root' });
    cy.visit('http://localhost:3000');
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application');
    cy.get('#username');
    cy.get('#password');
    cy.get('#login-button');
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('password');
      cy.get('#login-button').click();
      cy.contains('Logged in as root');
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('pass');
      cy.get('#login-button').click();
      cy.get('.error')
        .contains('Wrong credentials')
        .should('have.css', 'border-style', 'solid')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('root');
        cy.get('#password').type('password');
        cy.get('#login-button').click();
      })

      it.only('A blog can be created', function() {
        cy.contains('Add new blog').click();
        cy.get('#blog-title').type('new test blog');
        cy.get('#blog-author').type('test author');
        cy.get('#blog-url').type('test url');
        cy.get('#blog-submit-btn').click();

        cy.contains('new test blog test author');
      })
    })
  })
})