/**
 * 事件
 *
 * @author luoage@msn.cn
 */
const Events = require('events');
const eventEmitter = new Events();

var tickCount = 0;

eventEmitter.on('crontab-node start', () => {
  tickCount++;
});

eventEmitter.on('crontab-node end', () => {
  tickCount--;

  if (tickCount <=0 ) {
    eventEmitter.emit('crontab-node exit');
  }
});


module.exports = eventEmitter;
