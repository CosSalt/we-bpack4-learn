# 一些loader
### babel-loader
[Babel 是什么](https://www.babeljs.cn/docs/)
从Babel 7.4.0版本开始，不建议使用@babel/polyfill，建议直接使用 core-js/stable(用于模拟ECMAScript的功能)和 regenerator-runtime/runtime （转移后的生成器函数）
```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
```
通过在presets中设置useBuiltIns: "usage" 来优化不需要用到的polyfill
@babel/cli: 用于在终端运行Babel
@babel/core: Babel 的核心功能
@babel/preset-env: 转换功能集合
babel-loader: webpack打包时转化js代码到另一种js代码