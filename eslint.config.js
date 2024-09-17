import js from '@eslint/js';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import reactConfigJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactConfigRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default tsEslint.config({
  extends: [
    js.configs.recommended,
    ...tsEslint.configs.recommended,
    reactConfigRecommended,
    reactConfigJsxRuntime,
    eslintPrettier,
  ],

  files: ['src/**/*.ts', 'src/**/*.tsx', '*.config.js', '*.config.ts'],

  linterOptions: {
    reportUnusedDisableDirectives: 'error',
  },

  plugins: {
    'simple-import-sort': simpleImportSortPlugin,
    'react-hooks': reactHooksPlugin,
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
});
