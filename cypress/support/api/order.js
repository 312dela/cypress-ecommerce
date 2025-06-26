export function createOrder(token, productId = '67a8df56c0d3e6622a297ccd') {
  return cy.request({
    method: 'POST',
    url: 'https://rahulshettyacademy.com/api/ecom/order/create-order',
    headers: {
      Authorization: token,
    },
    body: {
      orders: [
        {
          country: 'Indonesia',
          productOrderedId: productId,
        },
      ],
    },
  });
}

export function getOrderDetails(orderId, token, options = {}) {
  return cy.request({
    method: 'GET',
    url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details',
    qs: { id: orderId },
    headers: {
      Authorization: token,
    },
    ...options,
  });
}
