class LoginPage {
  inputEmail(email) {
    cy.get('#userEmail').type(email);
  }

  inputPassword(password) {
    cy.get('#userPassword').type(password);
  }

  clickLogin() {
    cy.get('#login').click();
  }
}

export default new LoginPage();
