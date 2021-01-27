const { App } = require('koishi')

require('koishi-adapter-cqhttp')

const Middleware = require('./middleware')
const Config = require('./config')
const Sender = require('./sender')

const app = new App(Config.config)

console.log(Middleware)

Middleware.map(item => {
  if(!item.disabled)
    app.middleware(item.action)
})

Sender.map(item => {
  item(app.bots[0])
})

console.log('Dev server start at localhost:8081')
app.start()