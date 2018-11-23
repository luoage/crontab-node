/**
 * 事件
 *
 * @author luoage@msn.cn
 */
const Events = require('events');

class EventEmitter extends Events {};

const eventEmitter = new EventEmitter();

let tickCount = 0;

eventEmitter.on('crontab-node start', () => {
  tickCount++;
});

eventEmitter.on('crontab-node end', () => {
  tickCount--;

  if (tickCount <=0 ) {
    process.exit(0);
  }
});


module.exports = eventEmitter;
