module.exports = {
    root: true,
    env: {
        node: true,
        commonjs: true,
        es2021: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['warn', 4],
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'never'],
        'arrow-parens': ['error', 'as-needed'],
        'no-underscore-dangle': ['warn', { allowAfterThis: true }]
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
