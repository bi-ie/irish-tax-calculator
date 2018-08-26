module.exports = {
  // So parent files don't get applied
  root: true,
  env: {
    es6: true,
    browser: true,
  },
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: ['babel', 'import'],
  rules: {
    indent: 'off', // Incompatible with prettier
    semi: 'off',
    "arrow-parens": 'off'
  },
};
