# crontab-node

```
yarn add crontab-node
```

## Example1

```
const crontab = require('crontab-node');

setInterval(() => {
  console.log(new Date());

  crontab('* * * * *') && console.log('hit success !');
}, 1000);
```
## Example2

```
const crontab = require('crontab-node');
const eventEmitter = require('crontab-node/eventEmitter');

eventEmitter.on('crontab-node exit', () => {
	process.exit(0);
});
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1);
});

setInterval(() => {
  console.log(new Date());

  crontab('*/2 * * * *', undefined, () => {
    return promise.then(() => {
      console.log('I am callback, just excute once');
    });
  });
}, 1000);
```
