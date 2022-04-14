import React from 'react'
import ReactDOM from 'react-dom'
import SearchComponent from './components/search'

const container = document.getElementById('root')

const reactRender = () => {
  ReactDOM.render(<SearchComponent />, container)
}

if(module.hot) {
  module.hot.accept(root.render)
}

reactRender()