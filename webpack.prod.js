'use strict';

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production', // 'development' || 'production' || 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:"[name]_[hash:8].[ext]",
            }
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:"[name]_[hash:8].[ext]",
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
  ],
  // // 文件变化监听，默认false
  // watch: true,
  // // 只有开启了监听模式watchOptions才有意义
  // watchOptions: {
  //   // 不监听的文件或文件见，默认为空，支持正则匹配
  //   ignored: /node_modules/,
  //   // 监听到变化后会等300ms再去执行编译，默认300ms
  //   aggregateTimeout: 300,
  //   // 判断文件是否变化是通过不停询问系统制定文件是否发生变化实现的，默认每秒问 1000 次
  //   poll: 1000
  // }
}