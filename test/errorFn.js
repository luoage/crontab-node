const crontab = require('../schedule');
const eventEmitter = require('../eventEmitter');

const errorFn = function(e) {
  console.log(e);
};

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('I am errorFn');
    }, 1);
});

console.log(new Date());

crontab('* * * * *', () => {
  return promise.then(() => {
    console.log('I am callback, just excute once');
  });
}, {
  errorFn,
});
