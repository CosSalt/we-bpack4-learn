import { a } from './tree-shaking'

export function common() {
  a()
  console.log('common function')
}