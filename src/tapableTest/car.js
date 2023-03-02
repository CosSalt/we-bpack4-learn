const { SyncHook, AsyncSeriesHook } = require('tapable')

class Car {
  constructor() {
    this.hooks = {
      // 加速
      accelerate: new SyncHook(['newSpeed']),
      // 刹车
      brake: new SyncHook(),
      // 计算路径
      calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList'])
    }
  }
}

const myCar = new Car()

// 绑定同步钩子
myCar.hooks.brake.tap("WarningLampPlugin", () => {
  console.log('WarningLampPlugin')
})

// 绑定同步钩子，并传参
myCar.hooks.accelerate.tap('LoggerPlugin', (newSpeed) => {
  console.log(`Accelerating to ${newSpeed}`)
})

// 绑定一个异步 Promise 钩子
myCar.hooks.calculateRoutes.tapPromise("calculateRoutes tapPromise", (source, target, routesList) => {
  console.log('source', source)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`tapPromise to ${source} ${target} ${routesList}`)
      resolve()
    }, 1000)
  })
})

myCar.hooks.brake.call()
myCar.hooks.accelerate.call(10)

console.time('cost')

// 执行异步钩子
myCar.hooks.calculateRoutes.promise('Async', 'hook', 'demo').then(() => {
  console.timeEnd('cost')
}, err => {
  console.error(err)
  console.timeEnd('cost')
})