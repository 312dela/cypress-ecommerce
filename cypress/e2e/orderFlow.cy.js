/// <reference types = "cypress"/>

describe('Order Flow Validation', () => {
    let input = {};

    before(() => {
        cy.fixture('testData').then((data) => {
            input = data.orderFlow;
        });
    })

    beforeEach(() => {
        cy.loginAPI().then(() => {
            cy.visit("https://rahulshettyacademy.com/client",
                {
                    onBeforeLoad: (window) => {
                        window.localStorage.setItem('token', Cypress.env('token'));
                    }
                });
        });
    });

    it('Create order with same email as the respective account', () => {
        cy.contains('b', input.product1).parents('.card').find('button').contains('Add To Cart').click();
        cy.contains('b', input.product1).parents('.card').find('button').contains('Add To Cart').click();
        cy.contains('b', input.product2).parents('.card').find('button').contains('Add To Cart').click();
        cy.get('button[routerlink="/dashboard/cart"]').click();
        cy.get('div.subtotal').find('button').contains('Checkout').click();
        cy.get('.details__user').should('have.text', input.respectiveEmail);
        cy.get('input[placeholder="Select Country"]').type(input.location);
        cy.contains('button span', 'Indonesia').click();
        cy.get('.action__submit').click();
        cy.get('label.ng-star-inserted').first().invoke('text').then((orderIdRaw) => {
            const orderId = orderIdRaw.split('|')[1].trim();
            cy.get('button[routerlink="/dashboard/myorders"]').click();
            cy.contains('th[scope="row"]', orderId).parent().find('.btn-primary').click();
        });
        cy.contains(' Billing Address').parent().find('p.text').first().invoke('text').then((orderEmail) => {
            expect(orderEmail).to.include(input.respectiveEmail);
        });
    })

    it('Create order with different email from the respective account', () => {

    })

    it('Create order without shipping location provided', () => {

    })

    it('View order created by different email from the respective account', () => {

    })
});