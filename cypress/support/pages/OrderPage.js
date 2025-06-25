class OrderPage {
  changeEmailShippingInfo(email) {
    cy.get('.user__name input[type="text"]').clear();
    cy.get('.user__name input[type="text"]').type(email);
  }

  inputCountryShippingInfo(loc, location) {
    cy.get('input[placeholder="Select Country"]').type(loc);
    cy.contains('button span', location).click();
  }

  clickOrder() {
    cy.get('.action__submit').click();
  }

  assertShippingInformation() {
    cy.contains('#toast-container', 'Please Enter Full Shipping Information').should('exist');
  }
}

export default new OrderPage();
