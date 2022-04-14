# webpack4-learn
记录学习webpack过程中的一些信息
一些文档在docs里面

### 未解决问题
mini-css-extract-plugin 导致的热更新无效的问题
package.json 中设置sideEffects没起作用
eslint 配置没成功 [type](https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling)
ssr 尝试失败了
> 1. 静态的成功了，但有状态的失败了（用useState）
> 2. 想到了是因为模版文件里面并没有加载对应的js文件，只有dom文件
> 3. 能输出html文件，但是没法使用状态管理（useState）以及 没有事件绑定，页面只是一个单纯的html文件，没有讲其挂载到dom上

### 其它
[scripts]https://docs.npmjs.com/cli/v8/using-npm/scripts
npm 内置了一些命令，这些命令有对应的生命周期以及对应的钩子函数，在publish中prepublish已经废弃了，需要用prepublishOnly
[npm scripts 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)