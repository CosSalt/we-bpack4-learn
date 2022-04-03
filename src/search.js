import React from 'react'
import { createRoot } from 'react-dom/client'
import logo from './images/logo.jpg'
import TestModule from './test'
import './search.less'

const Search  = () => {
  const onClick = () => {
    import('./simple').then(show => {
      console.log('show', show.test())
    })
  } 
  return (
    <div className='search-text'>
      <button onClick={onClick}>click</button>
      <TestModule />
      <img src={logo}></img>
      Search Text3 1
    </div>
  )
}

const reactRender = () => {
  const container = document.getElementById('root')
  const root = createRoot(container)
  root.render(<Search />)
}

if(module.hot) {
  module.hot.accept(reactRender)
}

reactRender()