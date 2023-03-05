# 插件
loader 做不了的它都能做
插件没有 loader 那样的独立运行环境，只能在webpack中运行

### 基本结构
```javascript
class MyPlugin { // 插件名称
  apply(compiler) { // 插件上的 apply 方法（必须要有）
    compiler.hooks.done.tap('My Plugin', ( // 插件监听的 hooks（compiler、complation）
      stats /* stat is passed as argument when done hook is tapped */
    ) => {
      console.log("Hello World") // 插件的处理逻辑
    })
  }
}

module.exports = MyPlugin

// 插件使用
{
  plugins: [new MyPlugin()]
}
```
### 插件错误处理
##### 参数校验阶段
可以直接通过 throw 的方式抛出
```javascript
throw new Error('Error Message')
```
##### hooks 里面
通过 compilation 对象的 warnings 和 errors 接受
```javascript
compilation.warings.push("warning")
compilation.errors.push("error")
```

### 文件写入
##### 通过 Compilation 进行文件写入
Compilation 上的 assets 可以用于文件写入, 可以将 zip 资源包设置到 compilation.assets 对象上
```javascript
const { RawSource } = require('webpack-sources') // 文件写入需要用到
module.exports = class DemoPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    const { name } = this.options || {}
    // 老版本方式
    // compiler.plugin("emit", (compilation, cb) => {
    compiler.hooks.emit.tap({}, (context, compilation, cb) => {
      compilation.assets[name] = new RawSource("demo")
      cb()
    })
  }
}
```

### 插件扩展: 编写插件的插件
插件自身也可以通过暴露 hooks 的方式进行自身的扩展，例如 html-webpack-plugin