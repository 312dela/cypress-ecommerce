module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: ['eslint:recommended', 'plugin:cypress/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['cypress'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'double'],
    'no-unused-vars': 'warn',
  },
};
