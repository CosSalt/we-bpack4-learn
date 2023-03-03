# Webpack 打包原理

### 启动过程
1. 命令行： npm run dev, npm run build
会去找 webpack，在 node_modules\.bin 目录查找是否有 webpack.sh 或者 webpack.cmd(可执行的文件即可), 存在就执行，~~不存在就继续往上层目录的 node_modules\.bin 中去找，直到根目录下~~，或者是全局安装目录下(默认是 /usr/local/lib，可通过 npm config ls 查)，如果都不存在就报错
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


### Webpack 流程
准备阶段 =〉构建编译阶段 =〉优化输出阶段：模块编译优化、输出到磁盘
#### 钩子主要调用顺序
1. entry-option // 初始化 option
2. run // 开始编译
3. make // 从 entry 开始递归的分析依赖，对每个依赖模块进行 build
4. before-resolve // 对模块位置进行解析
5. build-module // 开始构建某个模块
6. normal-module-loader // 将 loader 加载完成的 module 进行编译，生成 AST 树
7. program // 遍历 AST，当遇到 require 等一些调用表达式时，收集依赖
8. seal // 所有依赖 build 完成，开始优化
9. emit // 输出到 dist 目录

#### 准备阶段
初始化参数，将参数转化为内部使用的参数，根据参数加载一些默认插件并挂载到complier上，并触发一些相应的事件，（before-run之前）

#### 构建编译阶段
##### 流程相关
1. (before-)run
2. (before-/after-)compile
3. make
4. (after-)emit
5. done（构建完成）
##### 监听相关
1. watch-run
2. watch-close

#### 优化输出阶段
模块编译优化、输出到磁盘
