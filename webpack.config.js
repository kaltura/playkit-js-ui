'use strict';

const webpack = require("webpack");
const path = require("path");
const PROD = (process.env.NODE_ENV === 'production');
const packageData = require("./package.json");

let plugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(packageData.version),
    __NAME__: JSON.stringify(packageData.name),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  })
];

if (PROD) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: true}));
}

module.exports = {
  context: __dirname + "/src",
  entry: {"playkit-ui": "playkit-js-ui.js"},
  output: {
    path: __dirname + "/dist",
    filename: '[name].js',
    library: "PlaykitUI",
    libraryTarget: "umd",
    devtoolModuleFilenameTemplate: "./ui/[resource-path]",
  },
  devtool: 'source-map',
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: "babel-loader"
        }],
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            rules: {
              semi: 0
            }
          }
        }],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            camelCase: true,
            modules: true,
            localIdentName: 'playkit-[local]'
          }
        }, {
          loader: "sass-loader"
        }]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + "/src"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ]
  },
  externals: {
    "playkit-js": {
      commonjs: "playkit-js",
      commonjs2: "playkit-js",
      amd: "playkit-js",
      root: "Playkit"
    }
  }
};
