class CartPage {
  clickCheckout() {
    cy.get('div.subtotal').find('button').contains('Checkout').click();
  }

  totalPrice() {
    let sum = 0;

    return cy
      .get('.prodTotal')
      .each(($el) => {
        const eachPrice = Number($el.text().split(' ')[1].trim());
        sum = sum + eachPrice;
      })
      .then(() => {
        return sum;
      });
  }
}

export default new CartPage();
