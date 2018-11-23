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

```
