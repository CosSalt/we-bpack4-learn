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