if(typeof window === 'undefined') {
  global.window = {}
}

const fs = require('fs')
const path = require('path')
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')

const templateHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
console.log('templateHtml', templateHtml)
server(process.env.PORT || 3000)

function server (port) {
  const app = express()

  app.use(express.static('dist')) // 设置静态目录

  app.get('/search', (req, res) => {
    debugger
    const a = SSR
    const str = renderToString(SSR)
    const htmlStr = renderMarkup(str)
    res.status(200).send(htmlStr)
  })
  app.listen(port, () => {
    console.log('Server is running on port:' + port)
  })
}

function renderMarkup(str) {
  return templateHtml.replace('<!--HTML_PLACEHOLDER-->', str)
}