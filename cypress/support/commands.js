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

Cypress.Commands.add('loginAPI', () => {
  cy.fixture('test-data').then((input) => {
    cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login', {
      userEmail: input.loginFlow.lowercaseEmail,
      userPassword: input.loginFlow.password,
    }).then((response) => {
      Cypress.env('token', response.body.token);
    });
  });
});

Cypress.Commands.add('otherUserLoginAPI', () => {
  cy.fixture('test-data').then((input) => {
    cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login', {
      userEmail: input.orderFlow.otherUserEmail,
      userPassword: input.orderFlow.otherUserPassword,
    }).then((response) => cy.wrap(response.body.token));
  });
});

Cypress.Commands.add('createOrder', (otherUserToken) => {
  return cy.request({
    method: 'POST',
    url: 'https://rahulshettyacademy.com/api/ecom/order/create-order',
    headers: {
      Authorization: otherUserToken,
    },
    body: {
      orders: [
        {
          country: 'Indonesia',
          productOrderedId: '67a8df56c0d3e6622a297ccd',
        },
      ],
    },
  });
});
