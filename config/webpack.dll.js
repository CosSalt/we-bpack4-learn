
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry:  {
    library: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name]_[hash:8].dll.js',
    path: path.join(__dirname, '../build/library'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash:8]',
      path: path.join(__dirname, '../build/library/[name].json'),
    })
  ]
}