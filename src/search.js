import React from 'react'
import { createRoot } from 'react-dom/client'
import logo from './images/logo.jpg'
import TestModule from './test'
import { common } from './common'
import { a } from './common/tree-shaking'
import './search.less'

a()
common()

const Search  = () => {
  const onClick = () => {
    import('./simple').then(show => {
      console.log('show', show.test())
    })
  }
  // debugger
  // a = 1;
  return (
    <div className='search-text test'>
      <button onClick={onClick}>click12</button>
      <TestModule />
      <img src={logo}></img>
      Search Text312
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)


const reactRender = () => {
  root.render(<Search />)
}

if(module.hot) {
  module.hot.accept(root.render)
}

reactRender()