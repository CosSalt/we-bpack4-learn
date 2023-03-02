const { SyncHook } = require('tapable')
require('./car')
const hook = new SyncHook(['arg1', 'arg2', 'arg3'])
// 绑定事件，类似于eventEmit 中的 on
hook.tap('hook1', (arg1, arg2, arg3, ...args) => {
  console.log(arg1, arg2, arg3, args)
})

// 触发事件，类似于eventEmit 中的 emit
hook.call(1,2,3)
hook.call(4,5,6,7)