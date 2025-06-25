class CartPage {
  clickCheckout() {
    cy.get('div.subtotal').find('button').contains('Checkout').click();
  }
}

export default new CartPage();
