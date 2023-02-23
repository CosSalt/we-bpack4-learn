
if(typeof window === 'undefined') {
  global.window = {}
}

const fs = require('fs')
const path = require('path')
const express = require('express')
const { renderToString } = require('react-dom/server')


const SSR = require('../dist/search-server')
console.log('SSR', JSON.stringify(SSR))

const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8')
const renderMarkup = (str) => {
  return template.replace('<!--HTML_PLACEHOLDER-->', str)
}

const server = (port) => {
  const app = express()
  app.use(express.static('dist'))
  app.get('/search', (req, res) => {
    const htmlText = renderMarkup(renderToString(SSR))
    res.status(200).send(htmlText)
  })
  app.listen(port, () => {
    console.log('666666666 on port: ', port)
  })
}

server(process.env.PORT || 3000)