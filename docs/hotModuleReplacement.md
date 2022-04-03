# 模块热更新
### 我们的打包需求是怎么来的
在webpack中，原始的状态是根据entry编译文件，输出到指定文件夹(output)，就完成了整个构建过程，当我们打包的时候这么处理没问题，但当我们在开发过程中这样就会有问题，我们需要监听文件变化，然后自动打包，这就是watch属性的意义，监听过程中，我们可以排除对一些特定目录的监听(如node_modules)，监听的文件是基于entry，所以我们修改webpack配置文件的时候是不能更新的，需要在重新启动一下，文件监听是基于文件的最后编辑时间来触发的，会先缓存起来，收集一段时间的变化后再一次性告诉监听者
有了文件监听再编译，我们就有另一个需求了，虽然我们编译了文件，但打开的浏览器还是老的文件，我们需要一种能自动刷新的机制，这就是HotModuleReplacement(HMR：模块热更新机制)
由于webpack是一种编译后生成bundle的机制，每次的编译时间很长，就出现了以Vite为代表的Bundless机制，利用现代浏览器的能力做到按需加载，不需要将整个文件打包，实现更加快速的页面展示
### HRM
webpack负责监听文件变化以及编译（在热更新的机制下，是保存在内存里面的，减少了文件I/O操作），webpack-dev-server模块则负责刷新浏览器
在使用HMR中，我们需要引入webpack-dev-server这个包,再在配置文件(默认webpack.config.js)中配置devServer，根据测试启用启用HMR(3.x 版本)后，watch属性的设置就无效了，
``` javascript
// 3.x 版本 只用到了watchOptions, 忽略了 watch 属性的值, 通过lazy配置选项来提供类似的能力了（但我在尝试的过程总报错了）
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
