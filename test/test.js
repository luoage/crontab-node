const crontab = require('../schedule');

setInterval(() => {
  console.log(new Date());

  crontab('* * * * *') && console.log('hit success !');
}, 1000);
