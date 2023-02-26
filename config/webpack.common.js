'use strict';
// webpack 打包的一些公共属性

const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html 模版处理
const CleanWebpackPlugin = require('clean-webpack-plugin') // 打包目录清理
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css 单独文件生成
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // css 文件资源压缩
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const outputPath = path.join(__dirname, '../dist')

// 多页面打包
const getMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, '../src/pages/*/index.js'))
  entryFiles.forEach(entryFile => {
    const match = entryFile.match(/src\/pages\/(.*)\/index\.js/)
    const [entryPath, entryName] = match || []
    if (entryPath && entryName) {
      entry[entryName] = entryFile // `./${entryPath}`
      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        template: path.join(__dirname, `../src/pages/${entryName}/index.html`),
        filename: `${entryName}.html`,
        chunks: ['commons', 'vendors', entryName],
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
  new MiniCssExtractPlugin({
    filename: '[name]_[contenthash:8].css'
  }),
  new OptimizeCssAssetsWebpackPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
  }),
  new CleanWebpackPlugin(),
  new FriendlyErrorsWebpackPlugin(),
  // 错误捕获插件
  function () {
    this.hooks.done.tap('done', (stats) => {
      if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
        console.error('build error')
        process.exit(1)
      }
    })
  },
]

// rules
const rules = [
  {
    test: /\.js$/,
    use: [
      'babel-loader',
      // 'eslint-loader',
    ]
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
          name: "[name]_[hash:8].[ext]",
        }
      }
    ]
  }, {
    test: /\.(woff|woff2|eot|ttf|otf)/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: "[name]_[hash:8].[ext]",
        }
      }
    ]
  }
]

module.exports = {
  entry,
  commonPlugins,
  outputPath,
  rules,
}