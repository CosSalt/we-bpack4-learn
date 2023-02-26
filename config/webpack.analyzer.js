'use strict';

const prodConf = require('./webpack.prod')
const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(prodConf, {
  plugins: [
    new BundleAnalyzerPlugin(),
  ]
})
