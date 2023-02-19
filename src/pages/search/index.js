import React, { useState } from 'react'
import ReactDom from 'react-dom'
import logo from '../../images/logo.png'
import './search.less'

const Search = () => {
  const [count, setCount] = useState(0)
  if(count >= 1) throw Error('test')
  return <div className="search-text">
    <div>Search Text</div>
    <img src={logo} />
    <div onClick={() => setCount(count + 1) }>count: {count}</div>
  </div>
}

ReactDom.render(<Search/>, document.getElementById('root'))