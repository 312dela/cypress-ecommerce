/// <reference types = "cypress"/>
//
import LoginPage from '../support/pages/LoginPage';

describe('Login Flow Validation', () => {
  let input = {};

  before(() => {
    cy.fixture('test-data').then((data) => {
      input = data.loginFlow;
    });
  });

  beforeEach(() => {
    cy.visit('https://rahulshettyacademy.com/client');
  });

  it('Login using registered email - lowercase', () => {
    LoginPage.inputEmail(input.lowercaseEmail);
    LoginPage.inputPassword(input.password);
    LoginPage.clickLogin();
    cy.contains('#toast-container', 'Login Successfully').should('exist');
  });

  it('Login using registered email - uppercase', () => {
    LoginPage.inputEmail(input.uppercaseEmail);
    LoginPage.inputPassword(input.password);
    LoginPage.clickLogin();
    cy.contains('#toast-container', 'Login Successfully').should('exist');
  });
});
