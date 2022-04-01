export function helloworld() {
  return 'Hello webpack'
}

export function helloTest() {
  return 'Hello test'
}

export const test = () => {
  console.log('test', this?.a)
}

export const test2 = () => {
  console.log('test', this?.a)
}

export function test3 () {
  return () => {
    console.log('test', this?.c)
  }
}