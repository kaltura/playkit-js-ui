'use strict';

const webpack = require('webpack');
const path = require('path');
const packageData = require('./package.json');
const CSS_MODULE_PREFIX = 'playkit';

let plugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(packageData.version),
    __NAME__: JSON.stringify(packageData.name),
    __CSS_MODULE_PREFIX__: JSON.stringify(CSS_MODULE_PREFIX),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  })
];

module.exports = {
  context: __dirname + '/src',
  entry: {
    'playkit-ui': 'index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: ['playkit', 'ui'],
    libraryTarget: 'umd',
    umdNamedDefine: true,
    devtoolModuleFilenameTemplate: './ui/[resource-path]'
  },
  devtool: 'source-map',
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {attributes: {id: `${packageData.name}`}}
          },
          {
            loader: 'css-loader',
            options: {
              localsConvention: 'camelCase',
              modules: {
                localIdentName: `${CSS_MODULE_PREFIX}-[local]`
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/src'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      event: path.resolve(__dirname, 'src/event'),
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  externals: {
    '@playkit-js/kaltura-player-js': {
      commonjs: '@playkit-js/kaltura-player-js',
      commonjs2: '@playkit-js/kaltura-player-js',
      amd: '@playkit-js/kaltura-player-js',
      root: ['KalturaPlayer']
    }
  }
};
