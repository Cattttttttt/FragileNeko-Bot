const LiveList = require('./list')
const LiveWS = require('./ws')
const { addListener } = require('../../hooks/useBus')
const { GroupId } = require('../../config')

const LiveWSList = {}

module.exports = bot => {

  addListener('living', roomid => {
    GroupId.forEach(id => {
      if(LiveList[roomid]) bot.sendGroupMsg(id, LiveList[roomid])
      else bot.sendGroupMsg(id, 'Error!')
    })
  })

  addListener('test', () => {
    console.log('success')
  })

  for(LiveId in LiveList) {
    LiveWSList[LiveId] = new LiveWS(parseInt(LiveId))
    LiveWSList[LiveId].checkStatus()
  }

}