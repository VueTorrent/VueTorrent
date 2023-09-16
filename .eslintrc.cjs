module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2016: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/typescript/recommended', 'prettier', 'plugin:import/recommended'],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/first-attribute-linebreak': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
}
