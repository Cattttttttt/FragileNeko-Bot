const { checkHelpArgs } = require('../../utils')
const { chat } = require('../../config/help')

module.exports = {
  action: (meta, next) => {

    if(!meta.message.startsWith('*chat')) return next()

    let message = meta.message.substring(6)

    if(checkHelpArgs(message)) {
      return meta.$send(chat.join('\n'))
    }

    const regexp = /^你(.+?)吗?[?？]*$/g
    
    if(regexp.test(message)) {
      return meta.$send(message.replace(regexp, '我$1!'))
    } else {
      return meta.$send('?')
    }
  },
  disabled: false
}