'use strict';
// webpack 打包的一些公共属性

const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html 模版处理
const CleanWebpackPlugin = require('clean-webpack-plugin') // 打包目录清理

const outputPath = path.join(__dirname, '../dist')

// 多页面打包
const getMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, '../src/pages/*/index.js'))
  entryFiles.forEach(entryFile => {
    const match = entryFile.match(/src\/pages\/(.*)\/index\.js/)
    const [entryPath, entryName] = match || []
    if(entryPath && entryName) {
      entry[entryName] = entryFile // `./${entryPath}`
      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        template: path.join(__dirname, `../src/pages/${entryName}/index.html`),
        filename: `${entryName}.html`,
        chunks: [entryName],
        inject: true, // 将打包bundle注入到html中
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCss: true,
          minifyJs: true,
          removeComments: false,
        }
      }))
    }
    // 处理 HtmlWebpackPlugin

  })
  return {
    entry,
    htmlWebpackPlugins,
  }
}
const { entry, htmlWebpackPlugins } = getMPA()
const commonPlugins = [
  ...htmlWebpackPlugins,
  new CleanWebpackPlugin(),
]

module.exports = {
  entry,
  commonPlugins,
  outputPath,
}