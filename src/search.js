import React from 'react'
import ReactDom from 'react-dom'
import './search.css'

const Search  = () => {
  return (
    <div className='search-text'>
      Search Text
    </div>
  )
}

ReactDom.render(<Search />, document.getElementById('root'))