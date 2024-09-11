/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
const fs = require('fs')
const path = require('path')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  ignorePatterns: fs
    .readFileSync(path.resolve(__dirname, '.gitignore'), 'utf8')
    .split('\n')
    .filter(Boolean),
  overrides: [
    {
      files: [
        '*.vue',
        '*.js',
        '*.jsx',
        '*.cjs',
        '*.mjs',
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}'
      ],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
