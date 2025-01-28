import custom from '@next-hono-monorepo/eslint-config'
import tseslint from 'typescript-eslint'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import nextPlugin from '@next/eslint-plugin-next'
import { FlatCompat } from '@eslint/eslintrc'

const flatCompat = new FlatCompat()

export default tseslint.config(
  ...custom,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  jsxA11yPlugin.flatConfigs.recommended,
  // Flat Config未対応
  ...flatCompat.extends('plugin:react-hooks/recommended'),
  {
    ignores: [
      '**/node_modules/*',
      '**/out/*',
      '**/.next/*',
      'eslint.config.mjs',
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      next: {
        rootDir: './apps/frontend',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.json'],
        },
        typescript: {
          config: 'tsconfig.json',
          project: './apps/frontend',
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    name: 'next/core-web-vitals',
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': ['error', './src/pages/'],
    },
  },
  {
    // eslint-plugin-reactのrules
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] },
      ],
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-curly-brace-presence': 'error',
      'react/jsx-pascal-case': 'error',
      // 詳細: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
      'react/self-closing-comp': 'error',
      // 詳細: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
      'react/jsx-curly-brace-presence': 'error',
    },
  },
)
