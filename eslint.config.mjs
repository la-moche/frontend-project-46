import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      'import': importPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Stylistic rules
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/no-trailing-spaces': ['error'],
      '@stylistic/arrow-parens': ['error', 'as-needed', {
        requireForBlockBody: true,
      }],
      '@stylistic/brace-style': ['error', 'stroustrup', {
        allowSingleLine: false,
      }],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],

      // Import rules
      'import/order': ['error', { 'newlines-between': 'always' }],
    },
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
    ],
  },
]
