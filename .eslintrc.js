module.exports = {
  env: {
    node: true,
    mocha: true,
  },
  extends: 'airbnb-base',
  rules: {
    'comma-dangle': 0
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  }
};
