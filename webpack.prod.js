'use strict';

const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css 单独文件生成
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // css 文件资源压缩
const HtmlWebpackPlugin = require('html-webpack-plugin') // html 模版处理
const CleanWebpackPlugin = require('clean-webpack-plugin') // 打包目录清理

// 多页面打包
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'))
  entryFiles.forEach(entryFile => {
    const match = entryFile.match(/src\/pages\/(.*)\/index\.js/)
    const [entryPath, entryName] = match || []
    if(entryPath && entryName) {
      entry[entryName] = entryFile // `./${entryPath}`
      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/pages/${entryName}/index.html`),
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
const { entry, htmlWebpackPlugins } = setMPA()
module.exports = {
  entry,
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
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
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
    new CleanWebpackPlugin(),
    ...htmlWebpackPlugins,
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