class MyOrdersPage {
  clickViewOrder(orderId) {
    cy.contains('th[scope="row"]', orderId).parent().find('.btn-primary').click();
  }
}

export default new MyOrdersPage();
