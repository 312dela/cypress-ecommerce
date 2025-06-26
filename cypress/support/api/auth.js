export function loginUser(email, password) {
  return cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login', {
    userEmail: email,
    userPassword: password,
  });
}
