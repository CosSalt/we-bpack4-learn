# 外部引用
webpack 支持外部引用，将部分库直接通过CDN引用，通过external定义的库在打包的时候会忽略对应的库，加快打包的速度，同时能够利用CDN的稳定性，在后续的版本更新中，能减少变更的部分，提高新版本的加载速度
缺点：会造成更多的http链接，无法使用tree shaking,引用的资源往往是全量代码
externals 的模式适用于引用React、ReactDOM、Vue等资源，但对于loadash之类的按需加载往往会更好
### webpack externals
直接在webpack中配置externals属性，再在html中通过script把对应的资源给引用
### html-webpack-externals-plugin
通过html-webpack-externals-plugin这个插件来处理，能够自动打包到html中
``` javascript
new HtmlWebpackExtenalsPlugin({
  externals: [
    {
      module: 'react',
      entry: 'https://unpkg.com/react@18/umd/react.production.min.js',
      global: 'React'
    },
    {
      module: 'react-dom',
      entry: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
      global: 'ReactDOM'
    }
  ]
})
```
似乎线上环境才有用