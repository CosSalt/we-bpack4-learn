# Webpack 4 Learn
[玩转webpack](https://time.geekbang.org/course/intro/100028901)

### 环境
尽可能的锁版本，避免和教学视频差异过大无法复线
node: v10.21.0
设置淘宝镜像：npm config set registry https://registry.npmmirror.com
查看镜像：npm config get registry

### 打包命令
默认读取根目录下的 webpack.config.js，可以通过 ./node_modules/.bin/webpack 来打包
在webpack3中，modules 还是数组，在webpack4中变成了对象，moduleId由number变成了string [01.bundle.js]('./his/01.bundle.js')
package.json 中的scripts 会去读 ./node_modules/.bin 下的命令

### webpack 基础用法
#### entry
一切皆模块，依赖图的入口是entry
#### output
将编译后的文件输出到磁盘
filenam: '[name].js' // 占位符机制

#### loaders
webpack 原生只支持js和json两种文件类型，其他文件类型需要通过loaders去处理为有效的模块（个人理解：即js或json文件）,并且可以添加到依赖图里面
loader 本身是个函数，接受源文件作为参数，返回转换的结果
##### 常见的 loaders
1. babel-loader 转换新的 js 语法
2. css-loader 支持 .css 文件的加载和解析
3. less-loader 将 .less 文件转化为 .css 文件
4. ts-loader 将 ts 文件转化为 js 文件
5. file-loader 对图片、字体等进行处理
6. raw-loader 将文件（如图片、SVG文件）以字符串的形式导入
7. thread-loader 多进程打包 js 和 css (nodejs 默认是单线程的)

#### Plugins
用于增强 webpackd 的能力，用于文件的优化、资源的管理和环境变量的注入，loaders 没法做的事都能通过 Plugins 去做，如构建前删除上次构建目录
作用域整个构建过程，整个构建过程都能使用
##### 常见的 Plugins
1. CommonsChunkPlugin 将chunks相同的模块代码提取成公共 js
2. CleanWebpackPlugin 清理构建目录
3. ExtractTextWebpackPlugin 将 CSS 从 bundle 文件中提取成一个独立的 CSS 文件
4. CopyWebpackPlugin 将文件或文件夹拷贝到构建的输出目录
5. HtmlWebpackPlugin 创建 html 文件去承载输出的 bundle
6. UglifyjsZWebpackPlugin 压缩 JS
7. ZipWebpackPlugin 将打包的资源生成一个 zip 包