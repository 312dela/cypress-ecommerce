/// <reference types = "cypress"/>

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
        cy.fixture('testData').then((data) => {
            input = data.registrationFlow;
        });
    });

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/client');
        cy.get('.btn1').click();
    })

    it('Create account using lowercase - unregistered  email', () => {
        cy.get('#firstName').type(input.firstName);
        cy.get('#lastName').type(input.lastName);
        cy.get('#userEmail').type(emailLower);
        cy.get('#userMobile').type(input.phone);
        cy.get("select[formcontrolname='occupation']").select('2: Student');
        cy.get("input[value='Female']").check('Female');
        cy.get('#userPassword').type(input.password);
        cy.get('#confirmPassword').type(input.password);
        cy.get("input[type='checkbox']").check();
        cy.get('#login').click();

        cy.get('h1.headcolor').should('have.text', 'Account Created Successfully');
    });



    it('Create account using lowercase - registered  email', () => {
        cy.get('#firstName').type(input.firstName);
        cy.get('#lastName').type(input.lastName);
        cy.get('#userEmail').type(emailLower);
        cy.get('#userMobile').type(input.phone);
        cy.get("select[formcontrolname='occupation']").select('2: Student');
        cy.get("input[value='Female']").check('Female');
        cy.get('#userPassword').type(input.password);
        cy.get('#confirmPassword').type(input.password);
        cy.get("input[type='checkbox']").check();
        cy.get('#login').click();
        
        cy.contains('#toast-container', 'already').should('exist');


    });

    it('Create account using uppercase - registered  email', () => {
        cy.get('#firstName').type(input.firstName);
        cy.get('#lastName').type(input.lastName);
        cy.get('#userEmail').type(emailUpper);
        cy.get('#userMobile').type(input.phone);
        cy.get("select[formcontrolname='occupation']").select('2: Student');
        cy.get("input[value='Female']").check('Female');
        cy.get('#userPassword').type(input.password);
        cy.get('#confirmPassword').type(input.password);
        cy.get("input[type='checkbox']").check();
        cy.get('#login').click();
        
        cy.contains('#toast-container', 'already').should('exist');

    });
});
