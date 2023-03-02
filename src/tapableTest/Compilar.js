const { SyncHook, AsyncSeriesHook } = require('tapable')

module.exports = class Compiler {
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
  run () {
    this.accelerate(10)
    this.brake()
    this.calculateRoutes('Async', 'hook', 'demo')
  }
  accelerate (speed) {
    this.hooks.accelerate.call(speed)
  }
  brake() {
    this.hooks.brake.call()
  }
  calculateRoutes(...args) {
    this.hooks.calculateRoutes.promise(...args).then(() => {

    }, err => {
      console.error(err)
    })
  }
}