import importAlias from '@dword-design/eslint-plugin-import-alias'
import js from '@eslint/js'
import { configureVueProject, defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import { importX } from 'eslint-plugin-import-x'
import pluginPrettier from 'eslint-plugin-prettier/recommended'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

configureVueProject({
  tsSyntaxInTemplates: true,
  scriptLangs: ['ts'],
  rootDir: import.meta.dirname,
})

export default defineConfigWithVueTs(
  globalIgnores(['./*', '!src/**']),
  {
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: './tsconfig.json',
        }),
      ],
      'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  js.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  importAlias.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,
  eslintConfigPrettier,
  pluginPrettier,
  {
    rules: {
      '@dword-design/import-alias/prefer-alias': [
        'warn',
        {
          alias: {
            '@': './src',
          },
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': ['warn', { considerDefaultExhaustiveForUnions: true }],
      'func-style': ['error', 'declaration', { allowArrowFunctions: false, allowTypeAnnotation: false }],
      'import-x/extensions': ['error', 'never', { checkTypeImports: true, pattern: { json: 'always' } }],
      'import-x/no-named-as-default': 'off',
      'import-x/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
      'import-x/no-useless-path-segments': ['error', { noUselessIndex: true }],
      'import-x/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
        },
      ],
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
        },
      ],
      'vue/attributes-order': 'error',
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'beside',
          multiline: 'below',
        },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/prefer-v-model': 'warn',
      'vue/require-default-prop': 'off',
    },
  }
)
