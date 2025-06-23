/// <reference types = "cypress"/>

describe('Login Flow Validation', () => {
    let user = {};

    before(() => {
        cy.fixture('testData').then((data) => {
            user = data;
        });
    });

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/client');
    })

    it('Login using registered email - lowercase', () => {
        cy.get('#userEmail').type(user.emailLowercase);  
        cy.get('#userPassword').type(user.password);
        cy.get('#login').click();

        cy.contains('#toast-container', 'Login Successfully').should('exist');
    });

    it('Login using registered email - uppercase', () => {

        cy.get('#userEmail').type(user.emailUppercase);
        cy.get('#userPassword').type(user.password);
        cy.get('#login').click();
        
        cy.contains('#toast-container', 'Login Successfully').should('exist');
    });
});
