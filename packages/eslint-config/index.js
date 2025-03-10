const eslint = require('@eslint/js')
const globals = require('globals')
const tsEsLintParser = require('@typescript-eslint/parser')
const tseslint = require('typescript-eslint')
const prettierConfig = require('eslint-config-prettier')
const importPlugin = require('eslint-plugin-import')

module.exports = tseslint.config(
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsEsLintParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  // prettierの設定
  prettierConfig,
  {
    // eslintのrules
    rules: {
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      // 詳細: https://eslint.org/docs/latest/rules/curly
      curly: ['error', 'all'],
      // 詳細: https://eslint.org/docs/latest/rules/object-shorthand
      'object-shorthand': ['error', 'always'],
      // 詳細: https://eslint.org/docs/latest/rules/no-nested-ternary
      'no-nested-ternary': 'error',
      // 詳細: https://eslint.org/docs/latest/rules/no-console
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['../'],
        },
      ],
    },
  },
  {
    // eslint-plugin-importのrules
    plugins: { import: importPlugin },
    rules: {
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
  {
    // @typescript-eslintのrules
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      // 詳細: https://typescript-eslint.io/rules/consistent-type-definitions/
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // 詳細: @typescript-eslint/naming-convention
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'parameter',
          format: ['strictCamelCase'],
        },
        {
          selector: 'class',
          format: ['StrictPascalCase'],
          custom: {
            regex: 'send|start|find',
            match: false,
          },
        },
        {
          selector: 'typeLike',
          format: ['StrictPascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['StrictPascalCase'],
        },
        // 変数名のprefixの規則
        {
          selector: 'variable',
          types: ['boolean'],
          // prefix以降がPascalCaseである必要がある。検証の解決順はprefix -> format
          format: ['PascalCase'],
          prefix: ['is', 'can', 'should', 'has', 'did', 'will'],
        },
      ],
      // 詳細: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/array-type.md
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
        },
      ],
    },
  },
)
