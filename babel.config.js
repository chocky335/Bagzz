module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          $src: './src',
          $features: './src/features',
          $i18n: './src/i18n',
          $kit: './src/kit',
          $navigation: './src/navigation',
          $services: './src/services',
          $store: './src/store',
          $theme: './src/theme',
        },
      },
    ],
  ],
};
