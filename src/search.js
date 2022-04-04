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
    <div className='search-text test'>
      <button onClick={onClick}>click</button>
      <TestModule />
      <img src={logo}></img>
      Search Text3 12431
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)


const reactRender = () => {
  root.render(<Search />)
}

// if(module.hot) {
//   module.hot.accept(root.render)
// }

reactRender()