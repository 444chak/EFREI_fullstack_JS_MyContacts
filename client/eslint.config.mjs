// eslint.config.mjs — React (JS) strict minimal
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["node_modules/**", "dist/**", "build/**", ".next/**", "coverage/**"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    rules: {
      /* JS plus strict */
      "no-var": "error",
      "prefer-const": ["error", { destructuring: "all" }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-nested-ternary": "error",
      "object-shorthand": ["error", "always"],
      "no-useless-return": "error",
      "no-implicit-coercion": "error",

      /* React */
      "react/react-in-jsx-scope": "off",      // JSX runtime moderne
      "react/jsx-uses-react": "off",
      "react/self-closing-comp": "error",
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-pascal-case": "error",
      "react/no-array-index-key": "warn",
      "react/no-danger": "warn",
      "react/no-unstable-nested-components": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      /* Accessibilité */
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/no-autofocus": ["warn", { ignoreNonDOM: true }],

      /* Style */
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
];
