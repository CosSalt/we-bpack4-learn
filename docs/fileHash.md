# 文件指纹
### Hash
和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会改变
### Chunkhash
和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值（常用）
### Contenthash
根据文件内容来定义hash, 文件内容不变，则contenthash不变，往往是针对css文件使用，让js和css能够分离，js改变不影响css文件

### 其它
模块热更新不能使用 chunkhash 和 contenthash，而应该使用name或hash，因为服务器端不知道何时清除文件，会造成内存泄漏，（hash可用应该是因为可以把其它的hash的都清除了）
[webpack-dev-server --hot](https://github.com/webpack/webpack-dev-server/issues/377)