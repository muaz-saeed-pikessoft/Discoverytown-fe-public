import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["node_modules/**", ".next/**", "public/**"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "@typescript-eslint": typescriptEslint,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "warn",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [1, { extensions: [".js", ".ts", ".tsx"] }],
      "react/display-name": "off",
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: ["export"], next: ["*"] },
        {
          blankLine: "always",
          prev: ["*"],
          next: ["multiline-const", "multiline-let", "multiline-var", "export"],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.object.name='console'][callee.property.name='log']",
          message: "Avoid pushing console.log() statements",
        },
      ],
    },
  },
];
