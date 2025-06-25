class ThanksPage {
  getOrderId() {
    return cy
      .get('label.ng-star-inserted')
      .first()
      .invoke('text')
      .then((orderIdRaw) => orderIdRaw.split('|')[1].trim());
  }

  goToMyOrders() {
    cy.get('button[routerlink="/dashboard/myorders"]').click();
  }
}

export default new ThanksPage();
