/// <reference types = "cypress"/>

describe('Login Flow Validation', () => {
    let input = {};

    before(() => {
        cy.fixture('testData').then((data) => {
            input = data.loginFlow;
        });
    });

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/client');
    })

    it('Login using registered email - lowercase', () => {
        cy.get('#userEmail').type(input.lowercaseEmail);  
        cy.get('#userPassword').type(input.password);
        cy.get('#login').click();

        cy.contains('#toast-container', 'Login Successfully').should('exist');
    });

    it('Login using registered email - uppercase', () => {

        cy.get('#userEmail').type(input.uppercaseEmail);
        cy.get('#userPassword').type(input.password);
        cy.get('#login').click();
        
        cy.contains('#toast-container', 'Login Successfully').should('exist');
    });
});
