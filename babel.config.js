module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@models': './src/core/models',
          '@api': './src/core/api',
          '@features': './src/features',
          '@repository': './src/core/repository',
          '@types': './src/types',
          '@themes': './src/themes',
          '@images': './src/assets/images',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
