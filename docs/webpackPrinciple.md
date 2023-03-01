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
