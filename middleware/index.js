const fs = require('fs')

const plugins = []

fs.readdirSync(__dirname).forEach(item => {
  if(item !== 'index.js') {
    const middleware = require(__dirname + '/' + item)
    plugins.push(middleware)
  }
})

module.exports = plugins