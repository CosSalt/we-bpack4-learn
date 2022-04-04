# 代码压缩
### js 压缩
uglifyjs-webpack-plugin
mode为production时，webpack自动开启了,也可以自定义压缩，添加一些参数
### css 压缩
optimize-css-assets-webpack-plugin cssnano
``` javascript
// css 压缩
new OptimizeCssAssetsWebpackPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: require('cssnano')
})
```
### html 压缩
html-webpack-plugin
