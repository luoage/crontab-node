const crontab = require('../schedule');

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1);
});

setInterval(() => {
  console.log(new Date());

  crontab('*/2 * * * *', undefined, function() {
    return promise.then(() => {
      console.log('I am callback, just excute once');
    });
  });
}, 1000);
