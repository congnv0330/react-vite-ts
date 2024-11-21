import js from '@eslint/js';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tsEslint.configs.recommended,
      eslintPrettier,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
    ],

    files: ['src/**/*.ts', 'src/**/*.tsx', '*.config.js', '*.config.ts'],

    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },

    plugins: {
      'react-hooks': reactHooksPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 2020,

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

      // eslint-plugin-react
      'react/display-name': 'off',
      'react/prop-types': 'off',

      // eslint-plugin-react-hooks
      ...reactHooksPlugin.configs.recommended.rules,

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
