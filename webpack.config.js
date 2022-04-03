'use strict';

const path = require('path')
const webpack = require('webpack')


const config = {
  // entry: 打包输入
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  // output: 打包输出位置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // 占位符默认main
  },

  mode: 'development', // 'development' || 'production' || 'none'
  // loaders: 处理webpack原生不能处理的文件（模块），原生只支持js和json
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|otf|ttf)$/,
        use: [
          'file-loader' // 可以用url-loader
        ]
      }
    ]
  },
  watch: true, // 文件监听，自动构建出新的输出文件
  watchOptions: {
    ignored: /node_modules/, // 忽略包的文件监听
  },
  // plugins:[
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  devServer: {
    // contentBase: './dist',
    // hot: true,
    port: 8090,
    lazy: true,
  }
}


module.exports = config