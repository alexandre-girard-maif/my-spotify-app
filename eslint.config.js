import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

// Extract rule sets from plugin distributed configs to avoid using their legacy
// `plugins: ["name"]` array form that triggers flat-config warnings.
const hooksRules = reactHooks.configs['recommended-latest']?.rules || {};
const refreshRules = reactRefresh.configs.vite?.rules || {};
const baseJsRules = js.configs.recommended.rules || {};

export default defineConfig([
  // Ignore build and generated/report folders & instructional resource snippets
  globalIgnores(['dist', 'coverage', 'playwright-report', 'instructions', 'playwright.config.cjs']),
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      ...baseJsRules,
      ...hooksRules,
      ...refreshRules,
      // Mark JSX identifiers as used so no-unused-vars doesn't flag them
      'react/jsx-uses-vars': 'warn',
      'react/jsx-uses-react': 'off', // not needed with the new JSX transform
      // 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  // Override for CommonJS config files (*.cjs)
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 2020,
      globals: globals.node,
    },
  },
]);
