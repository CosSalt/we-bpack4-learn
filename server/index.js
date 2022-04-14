if(typeof window === 'undefined') {
  global.window = {}
}

const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')

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
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <div id="root">${str}</div>
      </body>
    </html>
  `
}