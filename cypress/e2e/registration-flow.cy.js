/// <reference types = "cypress"/>
import RegisterPage from '../support/pages/RegisterPage';

describe('Registration Flow Validation', () => {
  let baseEmail = '';
  let emailLower = '';
  let emailUpper = '';
  let input = {};

  before(() => {
    cy.task('getIncrementedEmail').then((email) => {
      baseEmail = email;
      emailLower = baseEmail.toLowerCase();
      emailUpper = emailLower.charAt(0).toUpperCase() + emailLower.slice(1);
    });
    cy.fixture('test-data').then((data) => {
      input = data.registrationFlow;
    });
  });

  beforeEach(() => {
    cy.visit('https://rahulshettyacademy.com/client');
    cy.get('.btn1').click();
  });

  it('Create account using lowercase - unregistered email', () => {
    RegisterPage.inputFirstName(input.firstName);
    RegisterPage.inputLastName(input.lastName);
    RegisterPage.inputEmail(emailLower);
    RegisterPage.inputPhone(input.phone);
    RegisterPage.inputOccupation();
    RegisterPage.inputGender();
    RegisterPage.inputPassword(input.password);
    RegisterPage.inputConfirmPassword(input.password);
    RegisterPage.clickCheckbox();
    RegisterPage.clickRegister();
    cy.get('h1.headcolor').should('have.text', 'Account Created Successfully');
  });

  it('Create account using lowercase - registered email', () => {
    RegisterPage.inputFirstName(input.firstName);
    RegisterPage.inputLastName(input.lastName);
    RegisterPage.inputEmail(emailLower);
    RegisterPage.inputPhone(input.phone);
    RegisterPage.inputOccupation();
    RegisterPage.inputGender();
    RegisterPage.inputPassword(input.password);
    RegisterPage.inputConfirmPassword(input.password);
    RegisterPage.clickCheckbox();
    RegisterPage.clickRegister();
    cy.contains('#toast-container', 'already').should('exist');
  });

  it('Create account using uppercase - registered email', () => {
    RegisterPage.inputFirstName(input.firstName);
    RegisterPage.inputLastName(input.lastName);
    RegisterPage.inputEmail(emailUpper);
    RegisterPage.inputPhone(input.phone);
    RegisterPage.inputOccupation();
    RegisterPage.inputGender();
    RegisterPage.inputPassword(input.password);
    RegisterPage.inputConfirmPassword(input.password);
    RegisterPage.clickCheckbox();
    RegisterPage.clickRegister();
    cy.contains('#toast-container', 'already').should('exist');
  });
});
