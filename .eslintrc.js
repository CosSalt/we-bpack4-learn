module.exports = {
  "parser": "esprima",
  // "parserOptions": {
  //   "ecmaVersion": 11,
  //   "sourceType": "module",
  //   "ecmaFeatures": {
  //     "jsx": true
  //   }
  // },
  "extends": "airbnb", // 继承多个用数组
 //  "extends": "eslint:recommended",
  "rules": {
    "eol-last": "off",
    "semi": "off",
    "no-console": 0,
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
  }
}