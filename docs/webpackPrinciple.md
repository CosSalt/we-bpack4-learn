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
准备阶段 => 构建编译优化阶段 => 输出阶段
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

#### 构建编译优化阶段
run => seal
watch 的方式运行构建就走【监听相关】的流程，否者就走【流程相关】的模式
##### 流程相关
1. (before-)run
2. (before-/after-)compile
3. make
4. emit(修改输出资源的最后时机)
5. (after-)emit
6. done（构建完成）
##### 监听相关
1. watch-run
2. watch-close

##### Compilation
Complier 调用 Compilation 生命周期方法
addEntry => addModuleChain 
finish(上报模块错误)
seal（资源生成、输出、优化相关的）

##### 模块相关
build-module
failed-module
succeed-module
使用loader处理解析模块,使用acron处理依赖，将其添加到依赖列表
##### 资源生成相关
module-asset
chunk-asset
##### 优化和 seal 相关
(after-)seal
optimize-modules(-basic/advanced)
after-optimize-modules
after-optimize-chunks
after-optimize-tree
optimize-chunk-modules(-basic/advanced)
after-optimize-chunk-modules
optimize-module/chunk-order
before-module/chunk-ids
(after-)optimize-module/chunk-ids
before/after-hash
##### Chunk 生成算法
1. webpack 先将 entry 中对应的 module 都生成一个新的 chunk
2. 遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中
3. 如果一个依赖 modules 是动态引入的模块，那么就会根据这个 moudle 创建一个新的 chunk, 继续遍历依赖
4. 重复上面的过程，直到得到所有的 chunks
#### 输出阶段
输出到磁盘
