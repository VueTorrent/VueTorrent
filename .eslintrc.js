module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  plugins: [
    'vue'
  ],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'array-bracket-spacing': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'never'],
    'comma-style': ['error', 'last'],
    eqeqeq: 0,
    indent: ['error', 2, {
      SwitchCase: 1,
      ignoredNodes: ['TemplateLiteral']
    }],
    'vue/html-indent': [
      'error',
      2,
      { ignores: ['VElement[name=code-block].children'] }
    ],
    'vue/multiline-html-element-content-newline': ['error', {
      ignores: ['code-block']
    }],
    'linebreak-style': ['error', 'unix'],
    'keyword-spacing': 'error',
    'prefer-const': 'error',
    'new-parens': 'error',
    'no-case-declarations': 'off',
    'no-const-assign': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    semi: ['error', 'never'],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    strict: ['error', 'never'],
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'vue/no-v-html': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-v-for-key': 'off',
    'vue/order-in-components': ['error'],
    'vue/space-infix-ops': 'error',
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-multi-spaces': ['error'],
    'newline-before-return': ['error']
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
