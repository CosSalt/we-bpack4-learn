// import React, { useState } from 'react'
// import logo from './images/logo.jpg'
// import TestModule from './test'
// import { common } from './common'
// import lagetNumber from 'odan-large-number'
// import './search.less'

const React = require('react')
const logo = require('./images/logo.jpg')
const lagetNumber = require('odan-large-number')

// 用useState 会报错
const Search = () => {
  const onClick = () => {}
  return (
    <div className='search-text test'>
      <button onClick={onClick}>click12</button>
      <button onClick={onClick}>动态 import</button>
      { lagetNumber(999, 999)}
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

module.exports = <Search />