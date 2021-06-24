module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-import-helpers'],
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    eqeqeq: ['warn'],
    'new-cap': 'off',
    'no-shadow': 'off',
    'no-console': ['warn'],
    'no-return-await': 'off',
    'no-return-assign': 'off',
    'import/extensions': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    'max-classes-per-file': ['error', 2],
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': ['warn', { allow: ['_id'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
}
