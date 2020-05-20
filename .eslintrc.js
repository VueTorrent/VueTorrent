module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: ['plugin:vue/essential', 'airbnb-base'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    plugins: ['vue', 'prettier'],
    rules: {
        semi: ['warn', 'never'],
        'no-console': 0,
        camelcase: 0,
        'no-restricted-syntax': 0,
        'no-shadow': 0,
        'class-methods-use-this': 0,
        'prefer-promise-reject-errors': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-unused-vars': 0,
        indent: 0,
        'comma-dangle': 0
    }
}
