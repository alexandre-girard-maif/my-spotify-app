import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { defineConfig, globalIgnores } from "eslint/config";

// Extract rule sets from plugin distributed configs to avoid using their legacy
// `plugins: ["name"]` array form that triggers flat-config warnings.
const hooksRules = reactHooks.configs["recommended-latest"]?.rules || {};
const refreshRules = reactRefresh.configs.vite?.rules || {};
const baseJsRules = js.configs.recommended.rules || {};
const jsxRuntimeRules = reactPlugin.configs["jsx-runtime"]?.rules || {};
const a11yRules = jsxA11y.configs.recommended?.rules || {};

export default defineConfig([
  // Ignore build and generated/report folders & instructional resource snippets
  globalIgnores([
    "dist",
    "coverage",
    "playwright-report",
    "instructions",
    "playwright.config.cjs",
  ]),
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...baseJsRules,
      // React JSX runtime specific adjustments (disables react-in-jsx-scope etc.)
      ...jsxRuntimeRules,
      ...hooksRules,
      ...refreshRules,
      ...a11yRules,
      // Mark JSX identifiers as used so no-unused-vars doesn't flag them
      "react/jsx-uses-vars": "warn",
      "react/jsx-uses-react": "off", // not needed with the new JSX transform
      "react/prop-types": "off", // using TS types or internal runtime checks instead
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-key": ["error", { checkFragmentShorthand: true }],
      "react/jsx-no-target-blank": ["error", { enforceDynamicLinks: "always" }],
      // Accessibility rule adjustments (override defaults where needed)
      "jsx-a11y/anchor-is-valid": [
        "warn",
        { components: ["Link"], specialLink: ["to"], aspects: ["noHref", "invalidHref", "preferButton"] }
      ],
      "jsx-a11y/no-autofocus": "warn",
      "no-unused-vars": ["error"],
    },
  },
  // Override for CommonJS config files (*.cjs)
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2020,
      globals: globals.node,
    },
  },
]);
