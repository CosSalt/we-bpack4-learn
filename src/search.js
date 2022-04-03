import React from 'react'
import ReactDom from 'react-dom'
import logo from './images/logo.jpg'
import TestModule from './test'
import './search.less'

const Search  = () => {
  return (
    <div className='search-text'>
      <TestModule />
      <img src={logo}></img>
      Search Text13
    </div>
  )
}

ReactDom.render(<Search />, document.getElementById('root'))