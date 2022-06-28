module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    //if not in production mode, the unused varible is a warning
    "no-unused-vars": process.env.NODE_ENV === "production" ? "error" : "warn",
  },
};
