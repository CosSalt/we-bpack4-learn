import React from 'react'
import ReactDom from 'react-dom'
import logo from './images/logo.jpg'
import './search.less'

const Search  = () => {
  return (
    <div className='search-text'>
      <img src={logo}></img>
      Search Text
    </div>
  )
}

ReactDom.render(<Search />, document.getElementById('root'))