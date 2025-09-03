import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      'import': importPlugin
    },
    languageOptions: {
      globals: {
        ...globals.node, // Добавляем глобальные переменные Node.js
        ...globals.es2021 // Добавляем ES2021 глобальные переменные
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
      'import/order': ['error', { 'newlines-between': 'always' }]
    },
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/'
    ]
  }
]
