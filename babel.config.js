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
          '@actions': './src/core/store/actions',
          '@actionTypes': './src/core/store/actionTypes',
          '@reducers': './src/core/store/reducers',
          '@sagas': './src/core/store/sagas',
          '@selectors': './src/core/store/selectors',
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
