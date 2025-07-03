/// <reference types = "cypress"/>
import DashboardPage from '../support/pages/DashboardPage';
import CartPage from '../support/pages/CartPage';
import OrderPage from '../support/pages/OrderPage';
import ThanksPage from '../support/pages/ThanksPage';
import MyOrdersPage from '../support/pages/MyOrdersPage';
import { getOrderDetails } from '../support/api/order';

describe('Order Flow Validation', () => {
  let input = {};

  before(() => {
    cy.fixture('test-data').then((data) => {
      input = data.orderFlow;
    });
  });

  beforeEach(() => {
    cy.loginAPI().then(() => {
      cy.visit('https://rahulshettyacademy.com/client', {
        onBeforeLoad: (window) => {
          window.localStorage.setItem('token', Cypress.env('token'));
        },
      });
    });
  });

  it('Count the total price of added products in cart', () => {
    DashboardPage.addProductToCart(input.product1);
    DashboardPage.addProductToCart(input.product2);
    DashboardPage.goToCart();

    CartPage.totalPrice().then((sum) => {
      cy.contains('.totalRow', 'Total')
        .find('.value')
        .invoke('text')
        .then((text) => {
          const actualTotalPrice = Number(text.replace('$', '').replace(',', '').trim());
          expect(sum).to.eq(actualTotalPrice);
        });
    });
  });

  it('Create order with same email as the respective account', () => {
    DashboardPage.addProductToCart(input.product1);
    DashboardPage.addProductToCart(input.product2);
    DashboardPage.goToCart();
    CartPage.clickCheckout();

    cy.get('.details__user').should('include.text', input.respectiveEmail);

    OrderPage.inputCountryShippingInfo(input.insertLocation, input.selectLocation);
    OrderPage.clickOrder();

    ThanksPage.getOrderId().then((orderId) => {
      ThanksPage.goToMyOrders();
      MyOrdersPage.clickViewOrder(orderId);
    });

    cy.contains(' Billing Address')
      .parent()
      .find('p.text')
      .first()
      .invoke('text')
      .then((orderEmail) => {
        expect(orderEmail).to.include(input.respectiveEmail);
      });
  });

  it('Create order with different email from the respective account', () => {
    DashboardPage.addProductToCart(input.product1);
    DashboardPage.addProductToCart(input.product2);
    DashboardPage.goToCart();
    CartPage.clickCheckout();

    OrderPage.changeEmailShippingInfo(input.otherUserEmail);
    cy.get('.details__user').should('include.text', input.otherUserEmail);

    OrderPage.inputCountryShippingInfo(input.insertLocation, input.selectLocation);
    OrderPage.clickOrder();

    ThanksPage.getOrderId().then((orderId) => {
      ThanksPage.goToMyOrders();
      MyOrdersPage.clickViewOrder(orderId);
    });

    cy.contains(' Billing Address')
      .parent()
      .find('p.text')
      .first()
      .invoke('text')
      .then((orderEmail) => {
        expect(orderEmail).to.include(input.otherUserEmail);
      });
  });

  it('Create order without shipping location provided', () => {
    DashboardPage.addProductToCart(input.product1);
    DashboardPage.addProductToCart(input.product2);
    DashboardPage.goToCart();
    CartPage.clickCheckout();

    OrderPage.changeEmailShippingInfo(input.otherUserEmail);
    cy.get('.details__user').should('include.text', input.otherUserEmail);

    OrderPage.clickOrder();
    cy.contains('#toast-container', 'Please Enter Full Shipping Information').should('exist');
  });

  it('View order created by different account from the respective account', () => {
    cy.otherUserLoginAPI().then((otherUserToken) => {
      cy.createOrder(otherUserToken).then((response) => {
        const orderId = response.body.orders[0];

        const currentUserToken = Cypress.env('token');

        getOrderDetails(orderId, currentUserToken, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(403);
        });
      });
    });
  });
});
