# 模块热更新
### 我们的打包需求是怎么来的
在webpack中，原始的状态是根据entry编译文件，输出到指定文件夹(output)，就完成了整个构建过程，当我们打包的时候这么处理没问题，但当我们在开发过程中这样就会有问题，我们需要监听文件变化，然后自动打包，这就是watch属性的意义，监听过程中，我们可以排除对一些特定目录的监听(如node_modules)，监听的文件是基于entry，所以我们修改webpack配置文件的时候是不能更新的，需要在重新启动一下，文件监听是基于文件的最后编辑时间来触发的，会先缓存起来，收集一段时间的变化后再一次性告诉监听者
有了文件监听再编译，我们就有另一个需求了，虽然我们编译了文件，但打开的浏览器还是老的文件，我们需要一种能自动刷新的机制，这就是HotModuleReplacement(HMR：模块热更新机制)
由于webpack是一种编译后生成bundle的机制，每次的编译时间很长，就出现了以Vite为代表的Bundless机制，利用现代浏览器的能力做到按需加载，不需要将整个文件打包，实现更加快速的页面展示
### 自动刷新
webpack-dev-server是在本地起了一个node服务，
webpack负责监听文件变化以及编译（在热更新的机制下，是保存在内存里面的，减少了文件I/O操作），webpack-dev-server模块则负责通知代理客户端刷新浏览器
页面自动刷新有两种方式，iframe、inline，通过往js文件中注入代理客户端代码，当服务器端通过webscoket通知客户端时，客户端刷新页面达到更新的作用
iframe 是将页面内容放在了一个iframe标签中，注入的代码量少
inline 是在entry的所有入口文件生成的bundle中都注入代理客户端代码，控制刷新
自动刷新解决了一些需求，但还有一些确定
页面直接刷新导致redux之类的状态管理中的状态丢失,
页面需要重新请求所有资源（如果是代hash的文件，理论上可以像vite一样设置长缓存来优化）
在自动刷新的机制上更近一步的就是HMR
### HMR
在HMR的模式中，当一个模块变动后，会发出一个向上传递的事件，当找到更新逻辑之后，就执行对应的更新逻辑（会向浏览器推送两个文件一个json和一个js文件），其中是可以自定义更新逻辑，如果一直没有找到更新逻辑，就会将页面刷新作为兜底逻辑
对于css文件，style-loader 中使用了module.hot.accept来处理热更新的问题
在使用HMR中，我们需要引入webpack-dev-server这个包,再在配置文件(默认webpack.config.js)中配置devServer，根据测试启用启用HMR(3.x 版本)后，watch属性的设置就无效了，
``` javascript
// 3.x 版本 只用到了watchOptions, 忽略了 watch 属性的值, 通过lazy配置选项来提供类似的能力了（但我在尝试的过程中报错了）
// 4.x 版本
{
watch:
  // eslint-disable-next-line no-nested-ternary
  typeof optionsForStatic.watch !== "undefined"
    ? // eslint-disable-next-line no-nested-ternary
      typeof optionsForStatic.watch === "boolean"
      ? optionsForStatic.watch
        ? def.watch
        : false
      : getWatchOptions(optionsForStatic.watch)
    : def.watch
}
```
### 其它代码和框架
社区还提供许多其他 loader 和示例，可以使 HMR 与各种框架和库平滑地进行交互……

[React Hot Loader](https://github.com/gaearon/react-hot-loader): 实时调整 react 组件。
[Vue Loader](https://github.com/vuejs/vue-loader): 此 loader 支持 vue 组件的 HMR，提供开箱即用体验。
[Elm Hot webpack Loader](https://github.com/klazuka/elm-hot-webpack-loader): 支持 Elm 编程语言的 HMR。
[Angular HMR](https://github.com/PatrickJS/angular-hmr): 没有必要使用 loader！直接修改 NgModule 主文件就够了，它可以完全控制 HMR API。
[Svelte Loader](https://github.com/sveltejs/svelte-loader): 此 loader 开箱即用地支持 Svelte 组件的热更新。

### 参考
[HMR](https://webpack.docschina.org/guides/hot-module-replacement#enabling-hmr)

