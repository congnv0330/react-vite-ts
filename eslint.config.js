import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['dist'],
  },
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
      globals: {
        ...globals.browser,
      },

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
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
    },
  },
);
