import tseslint from 'typescript-eslint'
import custom from '@next-hono-monorepo/eslint-config'

export default tseslint.config(...custom, {
  ignores: ['eslint.config.mjs'],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.json'],
      },
      typescript: {
        config: 'tsconfig.json',
        project: './apps/backend',
        alwaysTryTypes: true,
      },
    },
  },
})
