import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['dist']),
  js.configs.recommended,
  tsEslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  eslintPrettier,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', '*.config.js', '*.config.ts'],

    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },

    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
    ],

    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },

    languageOptions: {
      globals: globals.browser,
      sourceType: 'module',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // Typescript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // simple-import-sort
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // Side-effect imports (polyfills, etc.) — keep early so order is stable
            ['^\\u0000'],

            // Core libraries: React / ReactDOM first
            ['^react$', '^react-dom(/|$)', '^react/'],

            // Third-party: scoped (@mui/...) and bare (axios, lodash, …)
            // `^@\\w` does not match `@/…` (alias) because the next char after @ must be \w
            ['^@\\w', '^[a-z]'],

            // Internal modules: path alias (matches tsconfig "@/*" → "@/…")
            ['^@/'],

            // Relative: parent dirs first, then same-folder
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

            // Styles & assets last (relative or absolute-looking paths ending in these extensions)
            [
              '^.+\\.(css|scss|sass|less)$',
              '^.+\\.(png|jpe?g|gif|webp|svg|ico|avif)$',
              '^.+\\.(woff2?|ttf|otf|eot)$',
            ],
          ],
        },
      ],
    },
  },
);
