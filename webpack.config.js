const webpack = require('webpack');
const path = require('path');
const packageData = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');
const CSS_MODULE_PREFIX = 'playkit';

module.exports = (env, {mode}) => {
  return {
    entry: './src/index.js',
    optimization: {
      minimize: mode !== 'development',
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false
            }
          }
        })
      ]
    },
    devtool: 'source-map',
    // devtool: 'eval-source-map',
    module: {
      rules: [
        {
          // test: /\.(ts|js)$/,
          // test: /\.ts$/,
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                loose: true,
                bugfixes: true,
                targets: {
                  browsers: ["chrome >= 47", "firefox >= 51", "ie >= 11", "safari >= 8", "ios >= 8", "android >= 4"]
                }
              }], '@babel/preset-typescript'],
              plugins: [['@babel/plugin-transform-runtime']]
            }
          }
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
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
    resolve: {
      extensions: ['.ts', '.tsx','.js', '.scss', 'css'],
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
      '@playkit-js/kaltura-player-js': ['KalturaPlayer']
    },
    output: {
      filename: 'playkit-ui.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        umdNamedDefine: true,
        name: ['playkit', 'ui'],
        type: 'umd'
        // devtoolModuleFilenameTemplate: './ui/[resource-path]'
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
        __CSS_MODULE_PREFIX__: JSON.stringify(CSS_MODULE_PREFIX),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })
    ]
  };
};
