import globals from "globals";
import rocketseatConfig from "@rocketseat/eslint-config/react";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    ...rocketseatConfig,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
];
