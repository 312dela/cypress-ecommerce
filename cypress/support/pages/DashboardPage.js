class DashboardPage {
  addProductToCart(product) {
    cy.contains('b', product).parents('.card').find('button').contains('Add To Cart').click();
  }

  goToCart() {
    cy.get('button[routerlink="/dashboard/cart"]').click();
  }
}
export default new DashboardPage();
