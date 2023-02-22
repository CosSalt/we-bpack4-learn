import React, { useState, useCallback } from 'react'
// import logo from '../../images/logo.png'
// import './search.less'

const Search = () => {
  const [count, setCount] = useState(0)
  const [list, setList] = useState([])
  const [TextComp, setTextComp] = useState()
  // const loadComponent = useCallback(() => {
  //   import('./text').then((res) => {
  //     const { default: Text } = res
  //     setList([Text, <Text />, res])
  //     // setTextComp 是可以传递个函数进去的，所以导致TextComp的值是个实例
  //     setTextComp(Text)
  //   })
  // }, [])
  const onClick = useCallback(() => {
    setCount(count + 1);
    loadComponent();
  }, [])
  // console.log('TextComp', TextComp)
  return <div className="search-text">
    <div>Search Text</div>
    {/* <img src={logo} /> */}
    <div onClick={onClick}>count: {count}</div>
    <div>
      {/* { TextComp?.[0] } */}
      {/* {!!TextComp && <TextComp /> } */}
    </div>
  </div>
}

module.exports = <Search />

// export default <Search />