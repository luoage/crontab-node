/**
 * schedule 配合crontab使用
 *
 * @author luoage@msn.cn
 */
const moment = require('moment');
const parser = require('cron-parser');

module.exports = function (expression) {
  if ((expression || '').toString().split(/ +/).length !== 5) {
    throw new Error('invalid expression');
  }

  const options = { currentDate: new Date() };
  const current = parser.parseExpression(expression, options).prev();

  return current.toString() === moment().toString();
};
