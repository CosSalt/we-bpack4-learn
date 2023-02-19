'use strict';
const { entry, commonPlugins, outputPath } = require('./webpack.common')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry,
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  mode: 'development', // 'development' || 'production' || 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 设置 hot: true 会自动添加，不用在这里添加了
    ...commonPlugins,
  ],
  devServer: {
    contentBase: './dist',
    hot: true, // 设置 hot: true 会自动添加 HotModuleReplacementPlugin 插件
  },
  // 文件变化监听，默认false
  watch: true,
  // 只有开启了监听模式watchOptions才有意义
  watchOptions: {
    // 不监听的文件或文件见，默认为空，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化后会等300ms再去执行编译，默认300ms
    aggregateTimeout: 300,
    // 判断文件是否变化是通过不停询问系统制定文件是否发生变化实现的，默认每秒问 1000 次
    poll: 1000
  }
}