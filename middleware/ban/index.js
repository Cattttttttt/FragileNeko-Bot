const { checkHelpArgs } = require('../../utils')
const { ban } = require('../../config/help')

module.exports = {
  action: async (meta, next) => {

    if(!meta.message.startsWith('*禁言')) return next()
    const time = meta.message.substring(4)

    if(checkHelpArgs(time)) {
      return meta.$send(ban.join('\n'))
    }

    await meta.$bot.setGroupWholeBan(meta.groupId, false)

    await meta.$bot.setGroupBan(meta.groupId, meta.sender.userId, parseInt(time))
    return meta.$send('xp怪。')

  },
  disabled: false
}