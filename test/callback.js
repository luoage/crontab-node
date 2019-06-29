const crontab = require('../schedule');
const eventEmitter = require('../eventEmitter');

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1);
});

setInterval(() => {
  console.log(new Date());

  crontab('*/2 * * * *', () => {
    return promise.then(() => {
      console.log('I am callback, just excute once');
    });
  });
}, 1000);

eventEmitter.on('crontab-node exit', () => {
	process.exit(0);
});
