const events = require('events')
const emitter = new events.EventEmitter()

/**
 * 
 * @param {string} action 
 * @param {function} func 
 */
exports.addListener = (action, func) => {
  if(typeof func === 'function') emitter.on(action, func)
}

/**
 * 
 * @param {string} action 
 */
exports.dispatch = (action, ...args) => {
  emitter.emit(action, ...args)
}