const { checkHelpArgs } = require('../../utils')
const { echo } = require('../../config/help')

module.exports = {
  action: (meta, next) => {

    if(!meta.message.startsWith('*echo')) return next()

    const message = meta.message.substring(6)

    if(checkHelpArgs(message)) {
      return meta.$send(echo.join('\n'))
    }
    return meta.$send(message)
  },
  disabled: false
}