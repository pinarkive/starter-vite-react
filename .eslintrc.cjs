/* eslint-env node */
module.exports = {
  root: true,
  ignorePatterns: ["node_modules", "client/dist", "server/dist"],
  overrides: [
    {
      files: ["client/**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "react-hooks", "react-refresh"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
      ],
      env: { browser: true, es2020: true },
      rules: {
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
      },
      settings: { react: { version: "detect" } },
    },
    {
      files: ["server/**/*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      env: { node: true, es2020: true },
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
      },
    },
  ],
};
