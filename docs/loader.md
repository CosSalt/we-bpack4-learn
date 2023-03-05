# loader
##### 定义
一个导出为函数的 JavaScript 模块
```javascript
modules.exports = function (source) {
  return source
}
```
##### 执行顺序
多个 Loader 串行执行（上一个loader执行返回的结果给下一个loader）
顺序从后到前

函数组合的两种情况
Unix 中的 pipline: 从左到右
Compose（webpack 采取的方式）: 从右到左
```javascript
compose = (f,g) => (...args) => f(g(...args))
```
[loader-order](https://github.com/odanzhou/loader-order/commit/aeab9318ba8992812013ae08e7e2a112cf0427b7)
#### loader-runner
定义：允许在不安装 webpack 的情况下运行 loaders
作用：作为 webpack 的依赖，webpack 中使用它执行 loader，进行 loader 的开发和调试
```javascript
import { runLoaders } from "loader-runner"
runLoaders({
  resource: '/abs/path/to/file.txt?query', // String: 资源的绝对路径（可以增加查询字符串）
  loaders: ['/abs/path/to/loader.js?query'], // String[]: loader 的绝对路径（可以增加查询字符串）
  context: { minimize: true }, // 基础上下文之外的额外 loader 上下文
  readResource: fs.readFile.bind(fs), // 读取资源的函数
}, function(err, result) {
  // err: Error?
  // result.result: Buffer | String
})
```

#### loader 的参数获取
通过 loader-utils 的 getOptions 方法获取
```javascript
const loaderUtils = require('loader-utils')
module.exports = function (content) {
  const { name } = loaderUtils.getOptions(this)
}
```

#### loader 异常处理
loader 内直接通过 throw 抛出

通过 this.callback 传递错误
```javascript
this.callback(
  err: Error| null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?; any
)
```

#### 我悟了
对于大部分非js(包括 ts、jsx 这些文件)文件，其loader处理的意义是将其转化为一个额外的链接，因为这部分文件往往是没依赖的，less 这种除外，或者是将文件内联进去，就是将其以文本的形式而非链接，当然文本和链接也可以归到一个字符串上去