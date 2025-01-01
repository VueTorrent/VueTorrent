import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  importPlugin.flatConfigs.recommended,
  {
    ignores: ['**/.gitignore', '**/.release-please-manifest.json', '**/public/', '**/.github/']
  },
  {
    plugins: {
      vue: pluginVue.configs.recommended,
      prettier
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2016
      },
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    rules: {
      ...vueTsEslintConfig.rules,
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/first-attribute-linebreak': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prefer-const': 'off',
      'sort-imports': 'warn'
    }
  }
]
