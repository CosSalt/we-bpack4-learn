'use strict';

const path = require('path')


module.exports = {
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
  mode: 'development', // 'development' || 'production'
  // loaders: 处理webpack原生不能处理的文件（模块），原生只支持js和json
  module: {
    rules: [
      {}
    ]
  }
}