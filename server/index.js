
if(typeof window === 'undefined') {
  global.window = {}
}

const express = require('express')
const { renderToString } = require('react-dom/server')


const SSR = require('../dist/search-server')
console.log('SSR', JSON.stringify(SSR))

const renderMarkup = (str) => `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="root"><div>
    ${str}
  </body>
  </html>
`

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