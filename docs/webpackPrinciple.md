# Webpack 打包原理

### 启动过程
1. 命令行： npm run dev, npm run build
会去找 webpack，在 node_modules\.bin 目录查找是否有 webpack.sh 或者 webpack.cmd(可执行的文件即可), 存在就执行，不存在就继续往上层目录的 node_modules\.bin 中去找，知道更目录下，或者是全局安装目录下(默认是 /usr/local/lib，可通过 npm config ls 查)，如果都不存在就报错
实际文件入口是：node_modules\webpack\bin\webpack.js
需要在webpack中通过 bin 去指定
```json
{
  "bin": {
    "webpack": "./bin/webpack.js"
  }
}
```
webpack 的目的找到 webpack-command 或 webpack-cli 这两个包中的一个，再执行其bin的命令

### webpack-cli
提供了一些不需要编译的命令，默认没下载，下载在 @webpack-cli 下
init: 创建一份 webpack 配置文件
migrate: 进行 webpack 版本迁移
add: 往 webpack 配置文件中增加属性
remove: 往 webpack 配置文件中删除属性
serve: 运行 webpack-serve
generate-loader: 生成 webpack loader 代码
generate-plugin: 生成 webpack plugin 代码
info: 返回与本地环境相关的一些信息

##### 执行结果
如果是不需要编译的命令则执行对应的操作，命中会return
否者就会进行编译，对配置文件和命令行参数进行转换生成配置选项参数 options
最终会根据配置参数实例化 webpack 对象，然后执行构建流程