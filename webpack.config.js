const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const plugins = [new webpack.HotModuleReplacementPlugin()];

const entry = [path.resolve(path.join(__dirname, 'dist/server.js'))];

module.exports = {
  mode: 'production',
  devtool: false,
  externals: [nodeExternals()],
  name: 'server',
  plugins,
  target: 'node',
  entry,
  optimization: {
    namedModules: false,
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, './'),
    filename: 'server.prod.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: true,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { node: '12' }, // specify targets here
              },
            ],
          ],
        },
      },
    ],
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};
