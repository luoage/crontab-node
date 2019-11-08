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
 * @param {function|promise} [cb] 同步方法，或者promise对象
 * @param {Object} options} { date, args, errorFn }
 *
 * @return boolean
 */
module.exports = function (expression, cb, options) {
  if ((expression || '').toString().split(/ +/).length !== 5) {
    throw new Error('invalid expression');
  }
  options = options || {};

  const date = options.date;
  const args = options.args;
  const errorFn = options.errorFn || console.error;

  const exOpts = { currentDate: new Date() };
  const current = parser.parseExpression(expression, exOpts).prev();
  const currentDate = new Date(current.toString());
  const isExec = moment(currentDate).format('YYYY-MM-DD HH:mm') === moment(date).format('YYYY-MM-DD HH:mm');

  if (isExec && typeof cb === 'function') {
    eventEmitter.emit('crontab-node start');

    process.nextTick(async () => {
      let err;

      try {
        await cb.apply(this, [].concat(args));
      } catch(e) {
        err = e;
      }

      eventEmitter.emit('crontab-node end');
      err && errorFn(err);
    });
  }

  return isExec;
};
