class MyPlugin {
  constructor() {

  }
  apply(compiler) {
    // 监听 hook
    // 绑定同步钩子
    compiler.hooks.brake.tap("WarningLampPlugin", () => {
      console.log('WarningLampPlugin')
    })

    // 绑定同步钩子，并传参
    compiler.hooks.accelerate.tap('LoggerPlugin', (newSpeed) => {
      console.log(`Accelerating to ${newSpeed}`)
    })

    // 绑定一个异步 Promise 钩子
    compiler.hooks.calculateRoutes.tapPromise("calculateRoutes tapPromise", (source, target, routesList) => {
      console.log('source', source)
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`tapPromise to ${source} ${target} ${routesList}`)
          resolve()
        }, 1000)
      })
    })
  }
}

module.exports = MyPlugin