module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@controllers': './src/api/controllers',
          '@entities': './src/api/entities',
          '@services': './src/api/services',
          '@config': './src/config',
          '@asterisk-actions': './src/asterisk-actions',
          '@utils': './src/utils',
        },
      },
    ],
    '@babel/plugin-transform-typescript',
    'babel-plugin-transform-typescript-metadata',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  ignore: ['**/*.spec.ts'],
};
