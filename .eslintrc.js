module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "vue/no-use-v-if-with-v-for": "off",
    "unicorn/filename-case": "off",
    "number-literal-case/number-literal-case": ["warn"],
    "no-unused-expressions": "off",
    "no-constant-condition": "off",
    "no-unused-vars": "off",
    "unicorn/number-literal-case": "off",
    "vue/script-setup-uses-vars": "off",
    "import/no-mutable-exports": "off",
    "no-var": "off",
    "number-literal-case/number-literal-case": "off",
  },
  extends: [
    "@nuxtjs",
    "prettier",
    "prettier/vue",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
    "plugin:number-literal-case/recommended",
  ],
  plugins: ["prettier", "number-literal-case"],
};
