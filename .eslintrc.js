module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:vue/essential',
        'google'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'vue'
    ],
    rules: {
        indent: ['warn', 4],
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'never'],
        'arrow-parens': ['error', 'as-needed'],
        'no-underscore-dangle': ['warn', { allowAfterThis: true }],
        'quote-props': ['error', 'as-needed'],
        'object-curly-spacing': ['error', 'always'],
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        'max-len': ['error', { code: 100 }],
        'vue/html-quotes': ['error', 'double', { avoidEscape: true }]
    }
}
