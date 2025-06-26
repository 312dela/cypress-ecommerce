// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add("loginAPI",()=> {

//     cy.request("POST","https://rahulshettyacademy.com/api/ecom/auth/login",
//     {"userEmail":"anshika@gmail.com","userPassword":"Iamking@000"}).
//     then(function(response)
//     {
//         expect(response.status).to.eq(200)
//        Cypress.env('token',response.body.token);
//     })
// })
import { loginUser } from './api/auth';
import { createOrder } from './api/order';

Cypress.Commands.add('loginAPI', () => {
  cy.fixture('test-data').then((input) => {
    loginUser(input.loginFlow.lowercaseEmail, input.loginFlow.password).then((response) => {
      Cypress.env('token', response.body.token);
    });
  });
});

Cypress.Commands.add('otherUserLoginAPI', () => {
  return cy.fixture('test-data').then((input) => {
    return loginUser(input.orderFlow.otherUserEmail, input.orderFlow.otherUserPassword).then(
      (response) => {
        return response.body.token;
      }
    );
  });
});

Cypress.Commands.add('createOrder', (token, productId) => {
  return createOrder(token, productId);
});
