const WebSocket = require('ws')
const { dispatch } = require('../../hooks/useBus')
const { wsDecode, wsEncode } = require('../../utils/ws')

class WebSocketInstance {

  /**
   * 
   * @param {number} roomid 
   */
  constructor(roomid) {
    this.id = roomid
    this.ws = new WebSocket('wss://broadcastlv.chat.bilibili.com:2245/sub')
    this.ws.onopen = () => {
      this.ws.send(wsEncode(JSON.stringify({
        roomid: this.id
      }), 7))

      this.intervalNum = setInterval(() => {
        this.ws.send(wsEncode('', 2))
      }, 30000)
    }

    this.ws.onmessage = async msgEvent => {
      const packet = await wsDecode(msgEvent.data)
      //console.log('receive', packet.body)
      switch (packet.op) {
        case 5:
          packet.body.forEach(body => {
            switch (body.cmd) {
              case 'LIVE':
                dispatch('living', roomid)
                break
              default:
                //console.log(body);
            }
          })
          break;
        default:
          //console.log(packet);
      }
    }

    this.ws.onclose = () => {
      clearInterval(this.intervalNum)
    }
  }

  checkStatus() {
    console.log(this.ws.readyState)
  }
}

module.exports = WebSocketInstance