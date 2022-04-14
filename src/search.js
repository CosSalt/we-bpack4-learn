import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import logo from './images/logo.jpg'
import TestModule from './test'
import { common } from './common'
import lagetNumber from 'odan-large-number'
// import './search.less'


common()

const Search  = () => {
  const onClick = () => {
    
  }
  const [TextContent, setTextContent] = useState()
  // debugger
  // a = 1;
  const loadComponent = () => {
    import('./text.js').then(({ default: Text }) => {
      setTextContent(Text)
    })
  }
  console.log('TextContent', TextContent)
  return (
    <div className='search-text test'>
      <button onClick={onClick}>click12</button>
      <button onClick={loadComponent}>动态 import</button>
      { lagetNumber(999, 999)}
      {
        TextContent ? <>{ TextContent }</> : null
      }
      <TestModule />
      <div>
        1
        <div>11
          <div>111</div>
          <div>112</div>
        </div>
        <div>12
          <div>121</div>
          <div>122</div>
        </div>
      </div>
      <img src={logo}></img>
      Search Text312
    </div>
  )
}

const container = document.getElementById('root')

const reactRender = () => {
  ReactDOM.render(<Search />, container)
}

if(module.hot) {
  module.hot.accept(root.render)
}

reactRender()