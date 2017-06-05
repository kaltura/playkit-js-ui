'use strict';

const webpack = require( "webpack" );
const path = require( "path" );

module.exports = {
  context: __dirname + "/src",
  entry: {
    "playkit-js-ui": "playkit-js-ui.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [ {
      test: /\.js$/,
      use: [ {
        loader: "babel-loader"
      } ],
      exclude: [ /node_modules/ ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [ {
        loader: 'eslint-loader',
        options: {
          rules: {
            semi: 0
          }
        }
      } ]
    } ]
  },
  devServer: {
    contentBase: __dirname + "/src"
  },
  resolve: {
    modules: [ path.resolve( __dirname, "src" ), "node_modules" ]
  }
};
