const webpack = require('webpack');
const path = require('path');
const packageData = require('./package.json');
const CSS_MODULE_PREFIX = 'playkit';

module.exports = (env, {mode}) => {
  return {
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(tsx?|js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    bugfixes: true
                  }
                ],
                ['@babel/preset-typescript', {jsxPragma: 'h', jsxPragmaFrag: 'Fragment'}]
              ],
              plugins: [
                ['@babel/plugin-transform-runtime'],
                ['@babel/plugin-proposal-decorators', {legacy: true}],
                ['@babel/plugin-proposal-class-properties'],
                ['@babel/plugin-transform-react-jsx', {pragma: 'h', pragmaFrag: 'Fragment'}]
              ]
            }
          }
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
    output: {
      filename: 'playkit-ui.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        umdNamedDefine: true,
        name: ['playkit', 'ui'],
        type: 'umd'
      },
      clean: true
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'demo')
      },
      client: {
        progress: true
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(packageData.version),
        __NAME__: JSON.stringify(packageData.name),
        __CSS_MODULE_PREFIX__: JSON.stringify(CSS_MODULE_PREFIX)
      })
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat'
      }
    },
    externals: {
      '@playkit-js/kaltura-player-js': {root: 'KalturaPlayer'},
      '@playkit-js/playkit-js': {
        commonjs: '@playkit-js/playkit-js',
        commonjs2: '@playkit-js/playkit-js',
        amd: 'playkit-js',
        root: ['playkit', 'core']
      }
    }
  };
};
