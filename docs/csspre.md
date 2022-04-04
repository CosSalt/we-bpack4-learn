# CSS 自动补齐
autoprefixer post-css-loader
两者之间的关系
> autofixer是postcss的功能插件，主要是给css中的一些属性添加-webkit-这种前缀做兼容的，postcss-loader则是webpack的loader组件，主要作用是webpack在读取css模块的时候调用postcss和postcss的插件处理css内容的。所以会有postcss-loader配置options的过程实际上是为postcss配置需要的插件
> [Autoprefixer和postcss-loader的关系？](https://www.zhihu.com/question/304469194/answer/544498018)

