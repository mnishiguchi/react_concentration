var path = require('path');
var webpack = require('webpack');

// https://github.com/ampedandwired/html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/app/index.html",
    filename: "index.html",
    inject: "body"
});


// Given plenty of places expect absolute paths, we can avoid confusion by
// using absolute paths everywhere.
const PATHS = {
  app:  path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  devtool: 'eval',
  entry: [
    './app/index.js'
  ],
  output: {
    path: PATHS.dist,
    filename: 'index_bundle.js'
  },
  plugins: [
    HtmlWebpackPluginConfig
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test:    /\.css$/,
        // The loaders are evaluated from right to left.
        // `css-loader`:   resolves @import and url statements in our CSS files.
        // `style-loader`: resolves require statements in our JavaScript.
        loaders: ['style', 'css'],
        // `include` accepts either a path or an array of paths.
        include: PATHS.app
      }
    ]
  }
};
