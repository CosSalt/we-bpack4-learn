'use strict';

const path = require('path')
const MiniCssExtractPlugin =  require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
  // entry: 打包输入
  entry: {
    "search-server": './src/search-server.js'
  },
  // devtool: 'source-map',
  // output: 打包输出位置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // 占位符默认main
    chunkFilename: '[name]_[chunkhash:8].js', // 中间生成的chunk，如按需加载
    libraryTarget: 'umd'
  },

  mode: 'none', // 'development' || 'production' || 'none'
  // loaders: 处理webpack原生不能处理的文件（模块），原生只支持js和json
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'], // style-loader 是插入到header 的style标签里面的
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // style-loader 是插入到header 的style标签里面的
      },
      {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader', 'less-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')({
                browsers: [
                  'last 2 version', '>1%', 'ios 7'
                ]
              })
            ]
          }
        }],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
            loader: 'file-loader',
            options: {
              name: 'img/[name]_[hash:8].[ext]', // 图片的文件指纹中的hash是内容的hash值
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|otf|ttf)$/,
        use: [{
          loader: 'file-loader', // 可以用url-loader
          options: {
            name: 'img/[name]_[hash:8].[ext]', // 图片的文件指纹中的hash是内容的hash值
          }
        }
      ]
      }
    ]
  },
  // watch: true, // 文件监听，自动构建出新的输出文件(watch 最好别写在配置里）
  watchOptions: {
    ignored: /node_modules/, // 忽略包的文件监听
  },
  plugins:[
    // css 打包为单独的文件
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    // css 压缩
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // 清除dist目录
    new CleanWebpackPlugin(),
  ],
  optimization: {
    // // 公共包
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /(react|react-dom)/,
    //       name: 'vendors', // 将其添加到HtmlWebpackPlugin 的chunks中，才能加到html文件中
    //       chunks: 'all'
    //     }
    //   }
    // },
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    },
  },
}

module.exports = config