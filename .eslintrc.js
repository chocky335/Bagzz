module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'i18next', 'simple-import-sort', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'i18next/no-literal-string': 'error',

        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // type imports.
              ['\\u0000$'],
              // packages: `react` related packages come first
              ['^react', 'react', '^@?\\w'],
              // side effect imports.
              ['^\\u0000'],
              // $src imports
              ['^\\$src'],
              ['^\\$features'],
              ['^\\$i18n'],
              ['^\\$kit'],
              ['^\\$navigation'],
              ['^\\$services'],
              ['^\\$store'],
              ['^\\$theme'],
              // relative imports: parents, children, same-folder  `..` and `.` last
              [
                '^\\.\\.(?!/?$)',
                '^\\.\\./?$',
                '^\\./(?=.*/)(?!/?$)',
                '^\\.(?!/?$)',
                '^\\./?$',
              ],
            ],
          },
        ],
        'import/no-duplicates': 'error',
      },
    },
  ],
};
