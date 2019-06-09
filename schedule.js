/**
 * schedule 配合crontab使用
 *
 * @author luoage@msn.cn
 */
const moment = require('moment');
const parser = require('cron-parser');
const eventEmitter = require('./eventEmitter');

/**
 * 定时器
 *
 * @param {string} expression 定时器表达式
 * @param {mixed} [moment] 接收内容
 * @param {function|promise} [cb] 同步方法，或者promise对象
 *
 * @return boolean
 */
module.exports = function (expression, cb, { date, args }) {
  if ((expression || '').toString().split(/ +/).length !== 5) {
    throw new Error('invalid expression');
  }

  const options = { currentDate: new Date() };
  const current = parser.parseExpression(expression, options).prev();
  const currentDate = new Date(current.toString());
  const isExec = moment(currentDate).format('YYYY-MM-DD HH:mm') === moment(date).format('YYYY-MM-DD HH:mm');

  if (isExec && typeof cb === 'function') {
    eventEmitter.emit('crontab-node start');

    process.nextTick(async () => {
      try {
        await cb.apply(this, [].concat(args));
      } catch(e) {
        console.error(e);
      }

      eventEmitter.emit('crontab-node end');
    });
  }

  return isExec;
};
