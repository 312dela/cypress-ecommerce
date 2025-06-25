class RegisterPage {
  inputFirstName(firstName) {
    cy.get('#firstName').type(firstName);
  }

  inputLastName(lastName) {
    cy.get('#lastName').type(lastName);
  }

  inputEmail(email) {
    cy.get('#userEmail').type(email);
  }

  inputPhone(phone) {
    cy.get('#userMobile').type(phone);
  }

  inputOccupation() {
    cy.get("select[formcontrolname='occupation']").select('2: Student');
  }

  inputGender() {
    cy.get("input[value='Female']").check('Female');
  }

  inputPassword(password) {
    cy.get('#userPassword').type(password);
  }

  inputConfirmPassword(confirmPassword) {
    cy.get('#confirmPassword').type(confirmPassword);
  }

  clickCheckbox() {
    cy.get("input[type='checkbox']").check();
  }

  clickRegister() {
    cy.get('#login').click();
  }

  assertSuccessRegister() {
    cy.get('h1.headcolor').should('have.text', 'Account Created Successfully');
  }
}

export default new RegisterPage();
