// case 1
setTimeout(() => {
  console.log('timeout1')
  Promise.resolve().then(() => {
    console.log('promise1')
  })
}, 0)

setTimeout(() => {
  console.log('timeout2')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
// case 2
setImmediate(() => {
  console.log('setImmediate1')
  Promise.resolve().then(() => {
    console.log('promise1')
  })
})

setImmediate(() => {
  console.log('setImmediate2')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
})

const now = Date.now()
while(Date.now() - now < 3000) {

}
// < node 11
// timeout1
// timeout2
// promise1
// promise2

// >= node 11
// timeout1
// promise1
// timeout2
// promise2

// node < 11
// setImmediate1
// setImmediate2
// promise1
// promise2

// node >= 11
// setImmediate1
// promise1
// setImmediate2
// promise2

// https://www.zhihu.com/question/22855484/answer/2036056840
// node 初始化时先进入poll阶段