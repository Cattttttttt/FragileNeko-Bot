const Help = require('../../config/help')

module.exports = {
  action: (meta, next) => {

    if(!meta.message.startsWith('*help')) return next()
    const id = meta.message.substring(6)
    if(id === '--list' || id === '-l') return meta.$send(Help['list'].join('\n'))
    return meta.$send(Help['main'].join('\n'))
  },
  disabled: false
}