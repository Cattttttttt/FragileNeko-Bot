const fs = require('fs')

const senders = []

fs.readdirSync(__dirname).forEach(item => {
  if(item !== 'index.js') {
    const sender = require(__dirname + '/' + item)
    senders.push(sender)
  }
})

module.exports = senders