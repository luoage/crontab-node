const crontab = require('../schedule');

setInterval(() => {
  console.log(new Date());

  crontab('*/2 * * * *') && console.log('hit success !');
}, 1000);
