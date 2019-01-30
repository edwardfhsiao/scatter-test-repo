const base = require('./base.js');
const objectAssign = require('object-assign');
const webpack = require('webpack');
const PATH = require('./build_path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = objectAssign(base, {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: '[name].js',
  },
});

Object.keys(config.entry).map(i => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: PATH.HTML_PATH + '/layout.html',
      title: 'test',
      id: i,
      filename: `${i}.html`,
      hash: false,
      chunks: [i],
    }),
  );
});

module.exports = config;
