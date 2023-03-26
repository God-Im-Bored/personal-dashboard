module.exports = {
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "requireConfigFile": false,
        "ecmaVersion": "2017",
        "sourceType": "module",
        "babelOptions": {
            babelrc: false,
            configFile: false, 
            presets: ["@babel/preset-env"]
        }
    },}