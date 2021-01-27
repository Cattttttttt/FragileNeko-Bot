const zlib = require('zlib')
const pako = require('pako')

const textEncoder = new TextEncoder('utf-8')
const textDecoder = new TextDecoder('utf-8')

/**
 * 
 * @param {Array} buffer 
 * @param {Number} start 
 * @param {Number} len 
 */
const readInt = (buffer, start, len) => {
  let result = 0
  for(let i = len - 1; i >= 0; i--){
    result += Math.pow(256, len - i - 1) * buffer[start + i]
  }
  return result
}

/**
 * 
 * @param {Array} buffer 
 * @param {Number} start 
 * @param {Number} len 
 * @param {Number} value 
 */
const writeInt = (buffer, start, len, value) => {
  let i = 0
  while(i < len){
    buffer[start + i] = value / Math.pow(256, len - i - 1)
    i++
  }
}

/**
 * 
 * @param {string} str 
 * @param {number} op 
 */
exports.wsEncode = (str, op) => {
  let data = textEncoder.encode(str)
  let packetLen = 16 + data.byteLength
  let header = [0, 0, 0, 0, 0, 16, 0, 1, 0, 0, 0, op, 0, 0, 0, 1]
  writeInt(header, 0, 4, packetLen)
  //console.log('send', (new Uint8Array(header.concat(...data))).buffer)
  return (new Uint8Array(header.concat(...data))).buffer
}

const wsDecoder = blob => {
      let buffer = new Uint8Array(blob)
      let result = {}
      result.packetLen = readInt(buffer,0,4)
      result.headerLen = readInt(buffer,4,2)
      result.ver = readInt(buffer,6,2)
      result.op = readInt(buffer,8,4)
      result.seq = readInt(buffer,12,4)
      if(result.op === 5){
        result.body = []
        let offset = 0;
        
        while(offset < buffer.length){
          
          let packetLen = readInt(buffer,offset + 0,4)
          let headerLen = 16// readInt(buffer,offset + 4,4)
          let data = buffer.slice(offset + headerLen, offset + packetLen);
          if(result.ver === 2) {
            let newBuffer = zlib.inflateSync(new Uint8Array(data))
            const obj = wsDecoder(newBuffer)
            const body = obj.body
            result.body = result.body.concat(body)
          } else {
            let body = textDecoder.decode(data)
            //console.log(data.toString())
            if(body) {
              result.body.push(JSON.parse(body))
            }
          }
          //console.log(result.body)
          offset += packetLen;
        }
      }else if(result.op === 3){
        result.body = {
          count: readInt(buffer,16,4)
        };
      }
    return result
}

exports.wsDecode = blob => {
  return new Promise((resolve, reject) => {
    const result = wsDecoder(blob)
    resolve(result)
  })
}